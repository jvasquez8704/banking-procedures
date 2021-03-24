import React from 'react';
import { Modal, Row, Col, Button, Divider } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { activeAdvertisement } from '../../actions/ui';
import picture from '../../res/img/picture.png';
import { tabs } from '../../constants/constants';

const Advertisement = () => {
    const dispatch = useDispatch();
    const { openAdvertisement, tab } = useSelector(({ ui }) => ui);
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const col1Size = isMobile ? 24 : 15;
    const col2Size = isMobile ? 24 : 1;
    const col3Size = isMobile ? 24 : 8;
    const widthSize = isMobile ? 354 : 620;
    const size24 = 24;

    const closeModal = () => {
        dispatch(activeAdvertisement(false));
    }
    
    const handleClick = () => {
       window.open('https://aolweb.bancatlan.hn/ocbretail', "_blank");
    }

    return (
        <Modal
            title={<div><span></span></div>}
            width={widthSize}
            centered
            visible={openAdvertisement}
            onOk={closeModal}
            onCancel={closeModal}
            className={`${ !isMobile ? 'stc-modal-horizontal' : '' }`}
            >
            <Row type="flex" justify="center" className="icons-list">
               <Col xs={col1Size} sm={col1Size} md={col1Size} lg={col1Size} xl={col1Size} xxl={col1Size} style={{textAlign:'center'}}>
                   <Row style={{paddingRight:'1.6rem', paddingLeft:'1.6rem'}}>
                       <Col xs={size24} sm={size24} md={size24} lg={size24} xl={size24} xxl={size24}>
                           <h1>Aviso</h1>
                           <p style={{ fontFamily: 'neo_sans_rglr'}}>Te informamos que actualizamos la plataforma de Atlántida Online.</p>
                           <p style={{ fontFamily: 'neo_sans_rglr'}}>Para<strong style={{fontFamily:'neo_sans_bld'}}>{ tab === tabs.resetPassword ? ' restablecer tu contraseña ': ' desbloquear tu usuario '}</strong>presiona.</p>
                       </Col>
                       <Col xs={size24} sm={size24} md={size24} lg={size24} xl={size24} xxl={size24} style={{textAlign:'center'}}>
                           <Button type="primary" className="stc-button-1" onClick={handleClick} size="default">Continuar</Button>
                       </Col>
                   </Row>
               </Col> 
               <Col xs={col2Size} sm={col2Size} md={col2Size} lg={col2Size} xl={col2Size} xxl={col2Size} style={{textAlign:'center'}}>
                   {
                       isMobile ? <Divider dashed /> : <Divider type="vertical" />
                   }
               </Col>
               <Col xs={col3Size} sm={col3Size} md={col3Size} lg={col3Size} xl={col3Size} xxl={col3Size} style={{textAlign:'center'}}>
                   <img alt="Activa tu Banca Digital" className="stc-icon-store-size-3" src={picture} />
               </Col>
           </Row>
        </Modal>   
    );
};
export default Advertisement;

