import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import { useForm as validatorForm } from "react-hook-form";

import { setError, unsetError, updateStep } from '../../actions/ui';
import ExtraInfoTable from '../custom/ExtraInfoTable';
import CardInfoTable from '../custom/CardInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { setAchAccount, getCardInfo, getInfo } from '../../actions/service';


const BalanceInquiry = () => {
    const { handleSubmit, errors , control } = validatorForm();
    const dispatch = useDispatch();
    const data = useSelector(({ ach, ui, auth }) => ({ ach, auth }));
    const { ach:info, auth } = data;
    const accounts = info.products ? info.products.productsItems : [];
    const queryTypes = info.queryTypes;
    const [account, setAccount] = useState('');
    const [card, setCard] = useState({});
    const [type, setType] = useState('');

    const handleOnSubmit = () => {
        const { identity } = auth;
        const { token } = info;
        if (account === '') {
            dispatch(setError('Selecciona una tarjeta'));
            return;
        }

        if (type === '') {
            dispatch(setError('Selecciona tipo de consulta'));
            return;
        }
        dispatch(getCardInfo(identity, token, card, type));
    }

    const handleChange = value => {
        setType(value);
    }

    const handleChangeCard = value => {
      const cardResult = accounts.filter((acc) => acc.product === value);
      if (cardResult && Array.isArray(cardResult) && cardResult.length === 1) {
        setCard(cardResult[0]);
      }
      dispatch(setAchAccount(value));
      setAccount(value);
    };

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError()); 
        dispatch(getInfo({query:null}));     
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
          iLabel="Selección de tarjeta"
          errMjs="Por favor selecciona una tarjeta"
          iPlaceholder="Selecciona tarjeta a consultar"
          items={accounts}
          iHandleSelectChange={handleChangeCard}
          isRequired={true}
          irules={{
            required: {
              value: true,
              message: "Se requiere una tarjeta",
            },
          }}
        />

        <CustomSelect
          fieldName="block-type-item"
          iLabel="Selecciona tipo de consulta"
          errMjs="Por favor selecciona tipo de consulta"
          iPlaceholder="Selecciona un tipo de consulta"
          items={queryTypes}
          iHandleSelectChange={handleChange}
          isRequired={true}
          irules={{
            required: {
              value: true,
              message: "Se requiere tipo de consulta",
            },
          }}
        />

        <Form.Item name="info-item">
            { info.query && ( type === 'EX' ? <ExtraInfoTable info={info} /> : <CardInfoTable info={info} />) }
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="stc-button" htmlType="submit">
            Consultar
          </Button>
        </Form.Item>
        
        {
            info.query && (
                <Form.Item>
                    <Button
                        type="default"
                        className="btn stc-button-default"
                        htmlType="button"
                        onClick={handleBack}
                    >
                        Inicio
                    </Button>
                </Form.Item>
            )
        }
      </Form>
    );
};

export default BalanceInquiry;