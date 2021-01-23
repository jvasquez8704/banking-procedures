import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button, Checkbox } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from './UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { getAgree, getAgreement, getEnroll, setAchAccount } from '../../actions/ach';

const EnableACH = () => {

    const dispatch = useDispatch();
    const data = useSelector(({ ach }) =>  ach );
    const { token, detail, products, selectedAccount } = data;
    const accounts = products ? products.productsItems : [];
    const [account, setAccount] = useState('');
    const [approved, setApproved] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (!detail) {
            if (account === '') {
                dispatch(setError('Selecciona una cuenta'));
                return;
            }
        } else {
            if (!approved) {
                dispatch(setError('Debes aceptar los términos y condiciones'));
                return;
            }
            dispatch(getEnroll(token, selectedAccount));
        }
    }

    const handleChange = value => {
        dispatch(setAchAccount(value));
        setAccount(value);
        dispatch(getAgreement(token, value));
    }

    const handleChangeCheckbox = e => {
        setApproved(e.target.checked);
    }
    
    const handleBack = () => {
        dispatch(updateStep(1));
        dispatch(getAgree(null));
        dispatch(unsetError());      
    }
    
    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={handleSubmit}
        >
            <Form.Item name="info-item">
               <UserInfoTable info={data} />
            </Form.Item>
            
            <CustomSelect
                fieldName="account-item"
                iLabel="Selecciona una cuenta"
                errMjs="Por favor seleccione una cuenta"
                iPlaceholder="Seleccione una Cuenta"
                items={accounts}
                iHandleSelectChange={handleChange}
            />
            {
                detail && (
                    <div className="agreement-block">
                        <Form.Item name="info-item">
                            <p className="text-ach-agreement">{detail}</p>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox onChange={handleChangeCheckbox}>Acepto términos y Condiciones</Checkbox>
                        </Form.Item>
                    </div>
                )
            }

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

export default EnableACH;