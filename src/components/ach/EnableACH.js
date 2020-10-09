import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from './UserInfoTable';
import CustomSelect from '../common/CustomSelect';
import { getAgreement } from '../../actions/ach';

const EnableACH = () => {

    const dispatch = useDispatch();
    const info = useSelector(({ ach }) =>  ach );
    const accounts = info.products ? info.products.productsItems : [];
    const [account, setAccount] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const { token } = info;
        if (account === '') {
            dispatch(setError('Selecciona una cuenta...'));
            return;
        }
        dispatch(getAgreement(token, account)); 
    }

    const getSelectAccount = acct => {
        setAccount(acct);
    }
    
    const handleBack = () => {
        dispatch(updateStep(1));
        dispatch(unsetError());      
    }
    
    return (
        <Form
            name="basic"
            layout="vertical"
            className="form-content"
            onSubmit={handleSubmit}
        >
            <Form.Item name="info-item">
               <UserInfoTable info={info} />
            </Form.Item>
            <Form.Item
                label="Selecciona una cuenta"
                name="account-item"
                rules={[
                    {
                        required: true,
                        message: 'Por favor seleccione una cuenta',
                    },
                ]}
                className="noah"
                required
            >
                <CustomSelect items={accounts} getAccount={getSelectAccount} />
            </Form.Item>
            <Form.Item className="noah">
                <Button type="primary" className="stc-button" htmlType="submit">
                    Siguiente
                </Button>
            </Form.Item>
            <Form.Item className="noah">
                <Button type="default" className="btn" htmlType="button" onClick={handleBack}>
                    Atrás
                </Button>
            </Form.Item>
        </Form>

    );
};

export default EnableACH;