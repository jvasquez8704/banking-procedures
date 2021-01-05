import React, { useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import playstore from '../../res/img/playstore.svg';
import appstore from '../../res/img/appstore.svg';
import activa from '../../res/img/Telefono-Activa-Banca.png';
import { useSelector, useDispatch } from 'react-redux';
import { activeModal } from '../../actions/ui';

const Popup = ({open}) => {

    const dispatch = useDispatch();
    const { openModal } = useSelector(({ ui }) => ui);
    const [visible, setVisible] = useState(false);

  //   useEffect(() => {
  //     console.log('Show Modal ', openModal);
  //     setVisible(openModal);
  // }, [openModal])

    const closeModal = () => {
        // setVisible(flag);
        dispatch(activeModal(false));
    }
    
    const handleClick = () => {
       window.open('https://atla.hn/tutoriales', "_blank");
    }

    // useEffect(() => {
    //     setVisible(open);
    // }, [open])


    
     
    return (
        <>
        <Modal
          title={<div><span><InfoCircleOutlined style={{ fontSize: '22px', color: '#d9272e', marginRight: '5px'}}/></span> Atlántida</div>}
          centered
          // visible={visible}
          visible={openModal}
          onOk={closeModal}
          width={416}
          onCancel={closeModal}
          footer={[
            <Button key="submit" type="primary" onClick={closeModal}>
              Ok
            </Button>,
          ]}
        >
          <Row type="flex" justify="center" className="icons-list">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <p style={{ fontFamily: 'neo_sans_ltght'}}>Si deseas crear tu usuario de Atlántida Online o abrir una cuenta de ahorro descarga Atlántida Móvil y selecciona la opción Activa tu Banca Digital.</p>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
              <a href="https://play.google.com/store/apps/details?id=hn.com.enterprise.bancatlanapp" target="_blank" rel="noopener noreferrer" className="stc-link">
                <img alt="PlayStore Banco Atlantida" className="stc-icon-store-size" src={playstore} />
              </a>
              <a href="https://apps.apple.com/ar/app/atl%C3%A1ntida-m%C3%B3vil/id603339165" target="_blank" rel="noopener noreferrer" className="stc-link">
                <img alt="AppStore Banco Atlantida" className="stc-icon-store-size" src={appstore} />
              </a>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
                <img alt="Activa tu Banca Digital" className="stc-icon-store-size" src={activa} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
              <Button type="primary" className="stc-button" onClick={handleClick} icon="play-circle">
                 Ver Tutoriales
              </Button>
            </Col>
          </Row>  

        </Modal>
            
        </>
    );
};

export default Popup;

