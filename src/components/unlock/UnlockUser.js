import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';
import { unsetError, updateStep } from '../../actions/ui';
import { getUserInfo } from '../../actions/ach';

const UnlockUser = () => {

    const tab = useSelector( ({ui}) => ui.tab);
    const dispatch = useDispatch();
    const identity = useSelector(({ auth }) => auth.identity);
    const [{ username, token }, handleInputChange] = useForm({
        username: '',
        token: ''
    });

    const handleLogin = e => {
        e.preventDefault();
        if (tab === 1) {
            dispatch(startLogin(identity, username, token));
        } if (tab === 2) {
            dispatch(getUserInfo(identity, username, token));
        } else {
            console.log(`You are un tab ${tab}, no action for Unlock User`);
        }
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
            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit" style={{background:'#d9272e'}}>
                    Siguiente
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" className="btn" htmlType="button" onClick={handleBack}>
                    Atrás
                </Button>
            </Form.Item>
        </Form>

    );
};

export default UnlockUser;