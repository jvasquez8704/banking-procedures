import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { useForm } from '../../hooks/useForm';
import { unsetError, updateStep } from '../../actions/ui';
import { resetUserPassword } from '../../actions/user';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const identity = useSelector(({ auth }) => auth.identity);
    const [{ username, token, telephone, email }, handleInputChange] = useForm({
        username: '',
        token: '',
        telephone:'',
        email:''
    });

    const handleLogin = e => {
        
        e.preventDefault();   
        dispatch(resetUserPassword(identity, username, token, email, telephone));
        
    }

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={handleLogin}
        >
            <Form.Item
                label="Usuario Atlántida Online"
                name="username-item"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingresa tu usuario',
                    },
                ]}
                required
            >
                <Input
                    name="username"
                    placeholder="Ingresa tu usuario"
                    onChange={handleInputChange}
                />
            </Form.Item>
            <Form.Item
                label="Token"
                name="token-item"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingresa tu token',
                    },
                ]}
                required
            >
                <Input
                    name="token"
                    placeholder="Ingresa tu Token"
                    onChange={handleInputChange}
                />
            </Form.Item>
            <Form.Item
                label="Teléfono"
                name="phone-item"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingresa tu teléfono',
                    },
                ]}
                required
            >
                <Input
                    name="telephone"
                    placeholder="Ingresa tu teléfono"
                    onChange={handleInputChange}
                />
            </Form.Item>
            
            <Form.Item
                label="Correo Electrónico"
                name="email-item"
                rules={[
                    {
                        required: true,
                        message: 'Por favor ingresa tu correo electrónico',
                    },
                ]}
                required
            >
                <Input
                    name="email"
                    placeholder="Ingresa tu correo electrónico"
                    onChange={handleInputChange}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit">
                    Siguiente
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" className="btn" htmlType="button" onClick={handleBack}>
                    Atrás
                </Button>
            </Form.Item>

            <Form.Item
                name="normal-message"
            >
               <p>
                    Nota: Recuerda que los datos de correo y teléfono son los que anteriormente le has proporcionado a Banco Atlántida para comunicarse contigo.
               </p>
            </Form.Item>
        </Form>
    );
};

export default ResetPassword;