import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Modal } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from './UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { getAgree, getAgreement, getEnroll, setAchAccount } from '../../actions/ach';
import Logo from '../../res/img/logo_red.svg';

const EnableACH = () => {

    const dispatch = useDispatch();
    const data = useSelector(({ ach }) => ach);
    const { token, agreement, products, selectedAccount } = data;
    const accounts = products ? products.productsItems : [];
    const [account, setAccount] = useState('');
    const [approved, setApproved] = useState(false);
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        window.addEventListener('message', receiveMessage, true);

        // Receive message listener
        function receiveMessage(event) {
            var origin = event.origin || event.originalEvent.origin;
            var data = event.data;
            if (typeof data === "string")
                console.log('data => origin:',{data}, {origin});

            switch (data) {
                case 'ESL:MESSAGE:REGISTER':
                    event.source.postMessage('ESL:MESSAGE:ACTIVATE_EVENTS', origin);
                    break;

                case 'ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE':
                    event.source.postMessage('ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE', origin);
                    setApproved(true);
                    break;

                case 'ESL:MESSAGE:STARTED:SIGNER_COMPLETE_REVIEWED':
                    // event.source.postMessage('ESL:MESSAGE:STARTED:SIGNER_COMPLETE_REVIEWED', origin);
                    console.log('SIGNER_COMPLETE_REVIEWED 3', {event});
                    dispatch(getEnroll(token, selectedAccount));
                    setTimeout(() => {                        
                        setVisibility(false); 
                    }, 10000);        
                    break;

                default:
                    console.log('default => ', {event});
                    event.source.postMessage(data, origin)
                    break;
            }
        }
    })

    useEffect(() => {
        console.log("Cristian agreement: ", agreement)
        setVisibility(!!agreement)
    }, [agreement])

    const handleSubmit = e => {
        e.preventDefault();
        if (!agreement) {
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

    const handleBack = () => {
        dispatch(updateStep(1));
        dispatch(getAgree(null));
        dispatch(unsetError());
    }

    const handleNext = () => {
        dispatch(getEnroll(token, selectedAccount));
        setVisibility(false)
    }

    return (
        <Form name="basic"
            layout="vertical"
            className="stc-form"
            onSubmit={handleSubmit}>
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

            <Modal visible={visibility} width={1000} height={500}
                footer={[approved && <Button key="submit" type="primary" onClick={handleNext}>
                        Continuar
                    </Button>]}>
                <div className="stc-landing-option-logo">
                    <img alt='one span atl logo' src={Logo}
                        style={{
                            width: "10rem",
                            display:"block",
                            marginTop:"-1rem"
                        }}
                    />
                </div>
                <iframe title="Agreement"
                    className="agreement_frame"
                    width="100%"
                    height="500"
                    frameborder="0"
                    scrolling="yes"
                    allowTransparency="true" src={agreement}></iframe>
            </Modal>

            <Form.Item>
                <Button type="default" className="btn stc-button-default" htmlType="button" onClick={handleBack}>
                    Atrás
                </Button>
            </Form.Item>
        </Form>

    );
};

export default EnableACH;