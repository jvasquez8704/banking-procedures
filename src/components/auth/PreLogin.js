import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import { useForm as validatorForm } from "react-hook-form";
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { verifyCustomer } from '../../actions/auth';
import CustomInput from '../ui/form/CustomInput';


const Verify = () => {
    const { register, handleSubmit, errors , control } = validatorForm();
    const dispatch = useDispatch();
    const tab = useSelector( ({ui}) => ui.tab);
    //const [{ identity }, handleInputChange] = useForm({identity:''});
    const [handleInputChange] = useForm({identity:''});

    const handleLogin = ({identity}) => {
        dispatch(verifyCustomer(identity, tab === 3));
    }

    const handleKeyPress = e => {
        // if (isNaN(e.key)) {
        if (!validator.isAlphanumeric(e.key)) {
            e.preventDefault();
            return;
        }
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={handleSubmit(handleLogin)}
        >
             <CustomInput fieldName="identity"
                iLabel="Ingresa tu Identificación"
                errMjs={ errors.identity && errors.identity.message }
                iTypeErr={`${ errors.identity ? 'error': ''}`}
                iPlaceholder="Sin espacios ni guiones"
                ihandleInputChange={handleInputChange}
                ihandleKeyPress={handleKeyPress}
                iregister={register}
                icontrol={control}
                irules={{
                    validate: () => {},
                    required: {
                        value: true,
                        message: 'Por favor ingresa tu identificación'
                    },
                    maxLength: {
                        value: 19,
                        message: 'Por favor ingresa una identificación válida'
                    },
                    minLength: {
                        value: 4,
                        message: 'Por favor ingresa una identificación válida'
                    },
                    pattern: {
                        // value: /^[0-9]*$/,
                        value: /^[A-Za-z0-9]*$/,
                        message: 'Por favor ingresa tu identificación'
                    }

                }}
                iToolTip={"(Número de Identidad, Pasaporte o Carné de Residente)"}
                icenterText={true}
            />

            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit">
                    Siguiente
                </Button>
            </Form.Item>
        </Form>

    );
};

export default Verify;