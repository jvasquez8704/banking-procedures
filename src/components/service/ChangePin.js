import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import { useForm as validatorForm } from "react-hook-form";

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from '../custom/UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { setPin, setAchAccount } from '../../actions/service';
import { useForm } from '../../hooks/useForm';
import CustomInput from '../ui/form/CustomInput';

const ChangePin = () => {
    const { handleSubmit, errors , control } = validatorForm();
    const dispatch = useDispatch();
    const data = useSelector(({ ach, auth }) => ({ ach, auth }));
    const { ach:info, auth } = data;
    const accounts = info.products ? info.products.productsItems : [];
    const [handleInputChange] = useForm({pin:'', confirmedPin: ''});
    const [account, setAccount] = useState('');
    const [card, setCard] = useState({});
    const [temp, setTemp] = useState('')
    const [temp2, setTemp2] = useState('')

    const handleOnSubmit = ({ pin, confirmedPin }) => {
        const { token } = info;
        const { identity } = auth;

        if (account === '') {
            dispatch(setError('Selecciona una tarjeta'));
            return;
        }

        if (pin !== confirmedPin) {
            dispatch(setError('Valida confirmación de PIN, nuevo PIN y confirmación de PIN deben ser iguales'));
            return;
        }

        dispatch(setPin(identity, token, card , pin)); 
    }

    const handleChangeCard = value => {
        const cardResult = accounts.filter((acc) => acc.product === value);
        if (cardResult && Array.isArray(cardResult) && cardResult.length === 1) {
          setCard(cardResult[0]);
        }
        dispatch(setAchAccount(value));
        setAccount(value);
    }

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());      
    }

    const handleKeyPress = e => {
        let { name } = e.target;
        if (name === 'pin' && temp.length > 3) {
            e.preventDefault();
            return;
        }

        if (name === 'confirmedPin' && temp2.length > 3) {
            e.preventDefault();
            return;
        }

        if ((name === 'pin' || name === 'confirmedPin') && isNaN(e.key)) {
            e.preventDefault();
            return;
        }
        let dataTemp = name === 'pin' ? temp + e.key : temp;
        let dataTemp2 = name === 'confirmedPin' ? temp2 + e.key : temp2;
        e.target.name === 'pin' && setTemp(dataTemp);
        e.target.name === 'confirmedPin' && setTemp2(dataTemp2);
    }
    
    const handleKeyDown = e => {
        let key = e.which || e.keyCode || e.charCode;
        if(e.target.name === 'pin' && key === 8){
            let dataTemp = temp;
            if(dataTemp.length > 0){
                setTemp(dataTemp.slice(0, -1)); 
            }
        }

        if(e.target.name === 'confirmedPin' && key === 8){
            let dataTemp2 = temp2;
            if(dataTemp2.length > 0){
                setTemp2(dataTemp2.slice(0, -1)); 
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
                iLabel="Selección de tarjeta"
                errMjs="Por favor selecciona una tarjeta"
                iPlaceholder="Selecciona tarjeta"
                items={accounts}
                iHandleSelectChange={handleChangeCard}
                irules={{
                    required: {
                        value: true,
                        message: 'Se requiere tarjeta'
                    }
                }}
            />

            {/* <CustomInput fieldName="reason"
                iLabel="Motivo solicitud"
                errMjs="Por favor ingresa motivo"
                iPlaceholder="Ingresa motivo de solicitud"
                ihandleInputChange={handleInputChange}
            />

            <CustomInput fieldName="pin"
                iLabel="Número de Pin"
                errMjs="Por favor ingresa Pin"
                iPlaceholder="Sin espacios ni guiones"
                ihandleInputChange={handleInputChange}
                ionKeyPress={handleKeyPress}
                ionKeyDown={handleKeyDown}
            /> */}

            {/* <CustomInput fieldName="reason"
                iLabel="Motivo solicitud"
                errMjs={ errors.reason && errors.reason.message }
                iTypeErr={`${ errors.reason ? 'error': ''}`}
                iPlaceholder="Motivo solicitud"
                ihandleInputChange={handleInputChange}
                ihandleKeyPress={handleKeyPress}
                icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Por favor ingresa un motivo'
                    }
                }}
            /> */}

            <CustomInput fieldName="pin"
                iLabel="Digita tu nuevo PIN"
                errMjs={ errors.pin && errors.pin.message }
                iTypeErr={`${ errors.pin ? 'error': ''}`}
                iPlaceholder="Digita nuevo PIN"
                ihandleInputChange={handleInputChange}
                ihandleKeyPress={handleKeyPress}
                ihandleKeyDown={handleKeyDown}
                icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Por favor ingresa nuevo PIN'
                    },
                    maxLength: {
                        value: 4,
                        message: 'Por favor ingresa un PIN valido'
                    },
                    minLength: {
                        value: 4,
                        message: 'Por favor ingresa un PIN valido'
                    }
                }}
            />

            <CustomInput fieldName="confirmedPin"
                iLabel="Confirma tu nuevo PIN"
                errMjs={ errors.confirmedPin && errors.confirmedPin.message }
                iTypeErr={`${ errors.confirmedPin ? 'error': ''}`}
                iPlaceholder="Confirma nuevo PIN"
                ihandleInputChange={handleInputChange}
                ihandleKeyPress={handleKeyPress}
                ihandleKeyDown={handleKeyDown}
                icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Por favor ingresa confirmación de nuevo PIN'
                    },
                    maxLength: {
                        value: 4,
                        message: 'Por favor ingresa un PIN valido'
                    },
                    minLength: {
                        value: 4,
                        message: 'Por favor ingresa un PIN valido'
                    }
                }}
            />

            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit">
                    Siguiente
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" className="btn stc-button-default" htmlType="button" onClick={handleBack}>
                    Atrás
                </Button>
            </Form.Item>
        </Form>

    );
};

export default ChangePin;