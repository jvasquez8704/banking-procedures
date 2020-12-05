import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { unsetError, updateStep } from '../../actions/ui';
import { getAgree } from '../../actions/ach';


const Success = () => {

    const dispatch = useDispatch();
    const tab = useSelector( ({ui}) => ui.tab);
    const restartApp = e => {
        e.preventDefault();
        dispatch(updateStep(0));
        dispatch(unsetError());
        dispatch(getAgree(null));
    }

    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form stc-success-form"
            onSubmit={restartApp}
        >
            <Form.Item
                name="success-icon"
            >
               <CheckCircleFilled style={{ fontSize: '6.5rem', color: 'green', marginBottom: '2.5rem' }} />
            </Form.Item> 
            
            <Form.Item
                name="normal-message"
            >
               <p className="stc-success-message">
                    {
                        tab === 1 && 'Tu usuario ha sido desbloqueado con éxito.'
                    }
                    {
                        tab === 2 && 'Se habilitó con éxito su cuenta bancaria para realizar transferencias ACH.'
                    }
                    {
                        tab === 3 && 'Se ha enviado una contraseña temporal a tu correo electrónico.'
                    }
               </p>
            </Form.Item>

            <Form.Item
                name="normal-message"
            >
                {
                    tab !== 2 && (
                        <p className="stc-static-success-message">
                            <strong>
                                Ahora estás listo para realizar más de 400 transacciones en cualquier momento y en cualquier lugar.
                            </strong>
                        </p>
                    )
                }
            </Form.Item>

            <Form.Item>
                <Button type="primary" className="stc-button" htmlType="submit">
                    Inicio
                </Button>
            </Form.Item>
        </Form>

    );
};

export default Success;