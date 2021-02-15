import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'antd';
import { useForm as validatorForm } from "react-hook-form";
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { unsetError, updateStep } from '../../actions/ui';
import { resetUserPassword } from '../../actions/user';
import CustomInput from '../ui/form/CustomInput';

const ResetPassword = () => {
    const { handleSubmit, errors , control } = validatorForm();
    const dispatch = useDispatch();
    const { identity, customerCoreEmail } = useSelector(({ auth }) => auth);
    const [temp, setTemp] = useState('');
    //const [{ username, token, telephone, email }, handleInputChange] = useForm({ username: '', token: '', telephone: '', email: '' });
    const [handleInputChange] = useForm({ username: '', token: '', telephone: '', email: '' });
    const emailTemplate = `Correo Electrónico ${ customerCoreEmail ? ' (' + customerCoreEmail + ')' : '' }`;

    const handleLogin = ({ username, token, email, telephone }) => {  
        dispatch(resetUserPassword(identity, username, token, email, telephone));
    }

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());
    }

    const handleKeyPress = e => {
        const { name } = e.target
        if (name === 'token' && temp.length > 7) {
            e.preventDefault();
            return;
        }

        if (name === 'token' && !validator.isNumeric(e.key)) {
            e.preventDefault();
            return;
        }

        name === 'token' && setTemp(temp + e.key);
    }

    const handleKeyDown = e => {
        let key = e.which || e.keyCode || e.charCode;
        const { name } = e.target;
        name === 'token' && key === 8 && setTemp(temp.slice(0, -1)); 
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={handleSubmit(handleLogin)}
        >
           <CustomInput fieldName="username"
                iLabel="Usuario de tu Banca Digital"
                errMjs={ errors.username && errors.username.message }
                iTypeErr={`${ errors.username ? 'error': ''}`}
                iPlaceholder="Ingresa tu usuario"
                ihandleInputChange={handleInputChange}
                ihandleKeyPress={handleKeyPress}
                icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Por favor ingresa tu usuario'
                    },
                    validate: value => !validator.isAlphanumeric(value) ? "Por favor ingresa un usuario valido" : undefined
                    ,
                    maxLength: {
                        value: 20,
                        message: 'Por favor ingresa un usuario valido'
                    },
                    minLength: {
                        value: 6,
                        message: 'Por favor ingresa nu usuario valido'
                    }

                }}
            />
            <CustomInput fieldName="token"
                iLabel="Token"
                errMjs={ errors.token && errors.token.message }
                iTypeErr={`${ errors.token ? 'error': ''}`}
                iPlaceholder="Ingresa tu Token"
                ihandleInputChange={handleInputChange}
                ihandleKeyPress={handleKeyPress}
                ihandleKeyDown={handleKeyDown}
                icontrol={control}
                irules={{
                    validate: value => value.length !== 8 ? 'Por favor ingresa tu token' : undefined,
                    required: {
                        value: true,
                        message: 'Por favor ingresa tu token'
                    },
                    pattern: {
                        value: /^[0-9]*$/,
                        message: 'Por favor ingresa un token valido'
                    }

                }}
            />
            <CustomInput fieldName="email"
                iLabel={emailTemplate}
                errMjs={ errors.email && errors.email.message }
                iTypeErr={`${ errors.email ? 'error': ''}`}
                iPlaceholder="Ingresa tu correo electrónico"
                ihandleInputChange={handleInputChange}
                ihandleKeyPress={handleKeyPress}
                icontrol={control}
                irules={{
                    required: {
                        value: true,
                        message: 'Por favor ingresa tu correo electrónico'
                    },
                    validate: value => !validator.isEmail(value) ? "Por favor ingresa un correo electrónico valido" : undefined
                }}
            />
            <Form.Item
                name="normal-message" className="email-leyend"
            >
               <p>
                    <strong style={{fontFamily:'neo_sans_bld'}}>Nota:</strong> Si necesitas actualizar tu correo electrónico, llama al Call Center.
               </p>
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit">
                    Confirmar
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

export default ResetPassword;