import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Modal, Row, Col } from 'antd';

import { setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from './UserInfoTable';
import CustomSelect from '../ui/form/CustomACHSelect';
import { getAgree, getAgreement, getEnroll, setAchAccount } from '../../actions/ach';
import Logo from '../../res/img/logo_red.svg';
import iconErr from '../../res/img/alert_icon.svg';

const EnableACH = () => {

    const dispatch = useDispatch();
    const data = useSelector(({ ach }) => ach);
    const { token, agreement, products, selectedAccount } = data;
    const accounts = products ? products.productsItems : [];
    const [account, setAccount] = useState('');
    const [approved, setApproved] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [visibilityModalConfirm, setVisibilityModalConfirm] = useState(false);
    const [isConfirmAcc, setIsConfirmAcc] = useState(false);
    const I_PLACEHOLDER_TEXT = 'Seleccione una Cuenta';
    const [selected, setSelected] = useState(I_PLACEHOLDER_TEXT);

    useEffect(() => {
        window.addEventListener('message', receiveMessage, true);

        // Receive message listener
        function receiveMessage(event) {
            var origin = event.origin || event.originalEvent.origin;
            var data = event.data;
            if (typeof data === "string")
                //console.log('data => origin:',{data}, {origin}); ACTIVAR ESTO PARA DEBUG

            switch (data) {
                case 'ESL:MESSAGE:REGISTER':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:ACTIVATE_EVENTS', origin);
                    break;
                case 'ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE', origin);
                    setApproved(true);
                    break;
                case 'ESL:MESSAGE:SUCCESS:PACKAGE_DECLINE':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:SUCCESS:PACKAGE_DECLINE', origin);
                    setSelected(null);                 
                    setVisibility(false);  
                    setSelected(I_PLACEHOLDER_TEXT);
                    handleBack();
                    dispatch(updateStep(0));
                    console.log('ESL:MESSAGE:SUCCESS:PACKAGE_DECLINE');                   
                    break;
                case 'ESL:MESSAGE:STARTED:SIGNER_COMPLETE_REVIEWED':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:STARTED:SIGNER_COMPLETE_REVIEWED', origin);
                    console.log('SIGNER_COMPLETE_REVIEWED 3', {event});
                    dispatch(updateStep(3));
                    break;
                case 'ESL:MESSAGE:SUCCESS:DOCUMENT_NAVIGATION':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:SUCCESS:DOCUMENT_NAVIGATION', origin);
                    console.log('ESL:MESSAGE:SUCCESS:DOCUMENT_NAVIGATION');     
                    break;
                case 'ESL:MESSAGE:STARTED:DOCUMENT_NAVIGATION':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:STARTED:DOCUMENT_NAVIGATION', origin);
                    console.log('ESL:MESSAGE:STARTED:DOCUMENT_NAVIGATION');     
                    break;
                case 'ESL:MESSAGE:STARTED:SIGNER_COMPLETE':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:STARTED:SIGNER_COMPLETE', origin);
                    console.log('ESL:MESSAGE:STARTED:SIGNER_COMPLETE');     
                    break;
                case 'ESL:MESSAGE:ERROR:DOCUMENT_CONFIRM':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:ERROR:DOCUMENT_CONFIRM', origin);
                    console.log('ESL:MESSAGE:ERROR:DOCUMENT_CONFIRM');     
                    break;
                case 'ESL:MESSAGE:SUCCESS:DOCUMENT_CONFIRM':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:SUCCESS:DOCUMENT_CONFIRM', origin);
                    console.log('ESL:MESSAGE:SUCCESS:DOCUMENT_CONFIRM');     
                    break;
                case 'ESL:MESSAGE:STARTED:DOCUMENT_CONFIRM':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:STARTED:DOCUMENT_CONFIRM', origin);
                    console.log('ESL:MESSAGE:STARTED:DOCUMENT_CONFIRM');     
                    break;
                case 'ESL:MESSAGE:ERROR:PACKAGE_DECLINE':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:ERROR:PACKAGE_DECLINE', origin);
                    console.log('ESL:MESSAGE:ERROR:PACKAGE_DECLINE');     
                    break;
                case 'ESL:MESSAGE:STARTED:PACKAGE_DECLINE':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:STARTED:PACKAGE_DECLINE', origin);
                    console.log('ESL:MESSAGE:STARTED:PACKAGE_DECLINE');     
                    break;
                case 'ESL:MESSAGE:ERROR:PACKAGE_OPT_OUT':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:ERROR:PACKAGE_OPT_OUT', origin);
                    console.log('ESL:MESSAGE:ERROR:PACKAGE_OPT_OUT');     
                    break;
                case 'ESL:MESSAGE:SUCCESS:PACKAGE_OPT_OUT':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:SUCCESS:PACKAGE_OPT_OUT', origin);
                    console.log('ESL:MESSAGE:SUCCESS:PACKAGE_OPT_OUT');     
                    break;
                case 'ESL:MESSAGE:STARTED:PACKAGE_OPT_OUT':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:STARTED:PACKAGE_OPT_OUT', origin);
                    console.log('ESL:MESSAGE:STARTED:PACKAGE_OPT_OUT');     
                    break;
                case 'ESL:MESSAGE:ERROR:DOCUMENT_ACCEPT':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:ERROR:DOCUMENT_ACCEPT', origin);
                    console.log('ESL:MESSAGE:ERROR:DOCUMENT_ACCEPT');  
                    setTimeout(() => {
                        dispatch(getEnroll(token, selectedAccount));
                        //setSelected(null);                 
                        setVisibility(false);  
                        //setSelected(I_PLACEHOLDER_TEXT);
                    }, 7000);   
                    // handleBack();
                    // dispatch(updateStep(0));
                    break;
                case 'ESL:MESSAGE:SUCCESS:DOCUMENT_ACCEPT':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:SUCCESS:DOCUMENT_ACCEPT', origin);
                    console.log('ESL:MESSAGE:SUCCESS:DOCUMENT_ACCEPT', {origin});     
                    break;
                case 'ESL:MESSAGE:STARTED:DOCUMENT_ACCEPT':
                    event && event.source && event.source.postMessage('ESL:MESSAGE:STARTED:DOCUMENT_ACCEPT', origin);
                    console.log('ESL:MESSAGE:STARTED:DOCUMENT_ACCEPT');     
                    break;
                default:
                    //console.log('default => ', {event});
                    //event.source.postMessage(data, origin); 
                    break;
            }
        }
    })

    useEffect(() => {
        //console.log("Cristian agreement: ", agreement)
        // setVisibility(!!agreement); // levantar el modal OneSpan
        if(isConfirmAcc) {
            setVisibility(!!agreement);
        }else{
            setVisibilityModalConfirm(!!agreement);
        }
    }, [agreement])

    const handleSubmit = e => {
        e.preventDefault();
        if (!agreement) {
            if (!account) {
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
        dispatch(setAchAccount(selected));
        setAccount(selected);
        setVisibilityModalConfirm(true);
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

    const declineAccConfirm = () => {
        setVisibilityModalConfirm(false);
        setSelected(null);
        dispatch(setAchAccount(null)); 
        setAccount(null);
        setIsConfirmAcc(false);
        setTimeout(() => {
            setSelected(I_PLACEHOLDER_TEXT);
        },0);
    }
    const approveAccConfirm = () => {
        setVisibilityModalConfirm(false); 
        setIsConfirmAcc(true);
        dispatch(getAgreement(token, selected));
    }

    const getSelectedMaskAccount = ()  => {
        if(accounts && accounts.length) {
            const accountResult = accounts.find( account => account.product === selected)
            if(accountResult)  return accountResult.mask
        }
        return '';
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
                iPlaceholder={I_PLACEHOLDER_TEXT}
                items={accounts}
                iHandleSelectChange={handleChange}
                iOnHandleSelectChange={setSelected}
                selectedValue={selected}
            />

            <Modal visible={visibility} width={1000} height={500} className="stc-onespan-modal"
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
            <div className="stc-card-title">
                <Modal
                    title="Error"
                    visible={visibilityModalConfirm}
                    onCancel={declineAccConfirm}
                    className="stc-error-modal stc-modal"
                    footer={null}
                >
                    <img alt="Error img" className="stc-err-icon" src={iconErr} />
                    <p>{`Se activará el servicio ACH para la cuenta`} <span><strong style={{fontFamily:'neo_sans_bld'}}>{`${getSelectedMaskAccount()}`}</strong></span></p>
                    <Row type="flex" justify="center" className="icons-list">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} style={{textAlign:'center'}}>
                            <Button type="default" className="btn stc-button-not-confirm-modal" htmlType="button" onClick={declineAccConfirm}>
                                Cancelar
                            </Button>
                        </Col> 
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} style={{textAlign:'center'}}>
                            <Button type="primary" className="stc-button-confirm-modal" htmlType="button" onClick={approveAccConfirm}>
                                Confirmar
                            </Button>
                        </Col>
                    </Row>
                </Modal>
            </div>

            <Form.Item>
                <Button type="default" className="btn stc-button-default" htmlType="button" onClick={handleBack}>
                    Atrás
                </Button>
            </Form.Item>
        </Form>

    );
};

export default EnableACH;