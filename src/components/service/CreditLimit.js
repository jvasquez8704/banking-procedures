import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import { useForm as validatorForm } from "react-hook-form";

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from '../custom/UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { setLimitCard, setAchAccount } from '../../actions/service';
import CustomInput from '../ui/form/MaskInput';
import { useMask } from '../../hooks/useMask';

const ManagementPin = () => {
    const { handleSubmit, errors , control } = validatorForm();
    const dispatch = useDispatch();
    const data = useSelector(({ ach, ui, auth }) => ({ ach, download: ui.download, auth }));
    const { ach:info, auth } = data;
    const accounts = info.products ? info.products.productsItems : [];
    const types = info.cardTypes;
    const reasonUpdateLimit = info.reasonUpdateLimit;
    const [account, setAccount] = useState('');
    const [reason, setReason] = useState('');
    const [card, setCard] = useState({});
    const [amount, setAmount] = useState('0');
    const [maskamount, setMaskamount] = useState('0');
    const [temp, setTemp] = useState('');


    const handleOnSubmit = ({ amount }) => {
        const { identity } = auth;
        const { token } = info;

        if (account === '') {
            dispatch(setError('Selecciona una tarjeta'));
            return;
        }

        if (reason === '') {
          dispatch(setError('Selecciona un motivo'));
          return;
      }

        dispatch(setLimitCard(identity, token, card, amount));
    }
    
    const handleInputChange = ({ target }) => {
      let unMaskedValue = target.value.replace("$", "")
      unMaskedValue = target.value.replace(".00", "")
      setMaskamount(`$ ${unMaskedValue}.00`)
      console.log('amount: ', amount)
      console.log('maskamount: ', maskamount)
      setAmount(unMaskedValue);
    }

    const handleChangeCard = value => {
        const cardResult = accounts.filter((acc) => acc.product === value);
        if (cardResult && Array.isArray(cardResult) && cardResult.length === 1) {
          setCard(cardResult[0]);
        }
        dispatch(setAchAccount(value));
        setAccount(value);
    }
    
    const handleChangeReason = value => {
        console.log('motivo ', value);
        setReason(value);
    }

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());      
    }

    const handleKeyPress = e => {
      if (e.target.name === 'amount' && temp.length > 11) {
          e.preventDefault();
          return;
      }

      if (e.target.name === 'amount' && isNaN(e.key)) {
          e.preventDefault();
          return;
      }
      let dataTemp = temp + e.key;
      e.target.name === 'amount' && setTemp(dataTemp);
    }
  
    const handleKeyDown = e => {
      let key = e.which || e.keyCode || e.charCode;
      if(e.target.name === 'amount' && key === 8){
          let dataTemp = temp;
          if(dataTemp.length > 0){
              setTemp(dataTemp.slice(0, -1)); 
          }
      }    
    }

    
    return (
      <Form
        name="basic"
        layout="vertical"
        className="stc-form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        {/* <Form.Item name="info-item">
          <UserInfoTable info={info} />
        </Form.Item> */}

        <CustomSelect
          fieldName="account-item"
          iLabel="Selecciona Tarjeta"
          errMjs="Por favor selecciona una tarjeta"
          iPlaceholder="Selecciona tarjeta"
          items={accounts}
          iHandleSelectChange={handleChangeCard}
          irules={{
            required: {
              value: true,
              message: "Se requiere tarjeta",
            },
          }}
        />

        <CustomSelect
          fieldName="reason-update-item"
          iLabel="Motivo"
          errMjs="Por favor selecciona un motivo"
          iPlaceholder="Selecciona un motivo"
          items={reasonUpdateLimit}
          iHandleSelectChange={handleChangeReason}
          irules={{
            required: {
              value: true,
              message: "Se requiere motivo",
            },
          }}
        />

        {
          reason === '3008' && (
            <Form.Item name="normal-message" className="decrease-leyend">
              <p>EL monto debe ser mayor o igual a $100.00</p>
            </Form.Item>
          )
        }
       

        <CustomInput
          fieldName="amount"
          iLabel="Monto"
          errMjs={errors.amount && errors.amount.message}
          iTypeErr={`${errors.amount ? "error" : ""}`}
          iPlaceholder="Ingresa monto"
          ihandleKeyDown={handleKeyDown}
          ihandleKeyPress={handleKeyPress}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa monto",
            },
          }}
        />

        <Form.Item>
          <Button type="primary" className="stc-button" htmlType="submit">
            Siguiente
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            className="btn stc-button-default"
            htmlType="button"
            onClick={handleBack}
          >
            Atrás
          </Button>
        </Form.Item>
      </Form>
    );
};

export default ManagementPin;