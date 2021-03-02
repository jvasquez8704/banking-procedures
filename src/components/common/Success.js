import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import { mjs as _mjs } from '../../constants/constants';
// import Icon, { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import ATLCheck from '../../res/img/check.svg';
import { unsetError, updateStep } from '../../actions/ui';


const Success = () => {

    const dispatch = useDispatch();
    const {tab, mjs} = useSelector( ({ui}) => ui);
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
                        tab === 3 && mjs
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
          {tab !== 3 && (
            <p className="stc-success-message">
              {`${_mjs._success}`}
            </p>
          )}
          {tab === 3 && (
            <p className="stc-success-message">
              {`${ mjs === _mjs.successLock ? _mjs._successLock : _mjs._success }`}
               
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