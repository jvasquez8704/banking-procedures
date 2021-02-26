import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import ATLCheck from '../../res/img/check.svg';
import { unsetError, updateStep } from '../../actions/ui';


const Success = () => {

    const dispatch = useDispatch();
    const tab = useSelector( ({ui}) => ui.tab);
    const restartApp = e => {
        e.preventDefault();
        dispatch(updateStep(0));
        dispatch(unsetError());
    }

    return (
      <Form
        name="basic"
        layout="vertical"
        className="stc-form stc-success-form"
        onSubmit={restartApp}
      >
        <Form.Item name="success-icon">
          <img alt='success process' src={ATLCheck}
            style={{
              width: "6.5rem",
              color: "green",
              marginBottom: "2rem",
            }}
          />
        </Form.Item>

        <Form.Item name="normal-message">
          <p className="stc-static-success-message">
                    {
                        tab === 1 && 'Cambio de Pin exitoso.'
                    }
                    {
                        tab === 2 && 'Tus datos han sido actualizados con éxito.'
                    }
                    {
                        tab === 3 && 'Gestión exitosa.'
                    }
                    {
                        tab === 4 && 'El límite de crédido de la tarjeta ha sido gestionado con éxito.'
                    }
                    {
                        tab === 5 && 'Consulta de movimientos exitosa.'
                    }
          </p>
        </Form.Item>

        <Form.Item name="normal-message">
          {tab !== 2 && (
            <p className="stc-success-message">
                Puedes seguir disfrutando de los beneficios de tus tarjetas.
            </p>
          )}
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