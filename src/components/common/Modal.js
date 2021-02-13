import React from 'react';
import { Modal, Row, Col, Button, Divider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import playstore from '../../res/img/playstore.svg';
import appstore from '../../res/img/appstore.svg';
import activa from '../../res/img/Telefono-Activa-Banca.png';
import { useSelector, useDispatch } from 'react-redux';
import { activeModal } from '../../actions/ui';

const Popup = ({open}) => {

    const dispatch = useDispatch();
    const { openModal } = useSelector(({ ui }) => ui);
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    console.log('Is mobile', isMobile);
  // const [visible, setVisible] = useState(false);

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
        {
          isMobile ? (
            <Modal
            title={<div><span><InfoCircleOutlined style={{ fontSize: '22px', color: '#d9272e', marginRight: '5px'}}/></span> Atlántida</div>}
            centered
            // visible={visible}
            visible={openModal}
            onOk={closeModal}
            width={354}
            onCancel={closeModal}
            footer={[
              <Button key="submit" type="primary" onClick={closeModal}>
                Ok
              </Button>,
            ]}
          >
            <Row type="flex" justify="center" className="icons-list">
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <h1>Activa tu Banca Digital</h1>
                <p style={{ fontFamily: 'neo_sans_rglr'}}>Si deseas crear tu usuario de Atlántida Online o abrir una cuenta de ahorro <strong style={{fontFamily:'neo_sans_bld'}}>descarga Atlántida Móvil</strong> y selecciona la opción Activa tu Banca Digital.</p>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
                <a href="https://play.google.com/store/apps/details?id=hn.com.enterprise.bancatlanapp" target="_blank" rel="noopener noreferrer" className="stc-link">
                  <img alt="PlayStore Banco Atlantida" className="stc-icon-store-size" src={playstore} />
                </a>
                <a href="https://apps.apple.com/ar/app/atl%C3%A1ntida-m%C3%B3vil/id603339165" target="_blank" rel="noopener noreferrer" className="stc-link">
                  <img alt="AppStore Banco Atlantida" className="stc-icon-store-size" src={appstore} />
                </a>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center', marginTop:'4px'}}>
                <a href="https://play.google.com/store/apps/details?id=hn.com.enterprise.bancatlanapp" target="_blank" rel="noopener noreferrer" className="stc-link">
                  <img alt="PlayStore Banco Atlantida" className="stc-icon-store-size" src={playstore} />
                </a>
              </Col>
              <Divider dashed />
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
                  <img alt="Activa tu Banca Digital" className="stc-icon-store-size" src={activa} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
                {/* <Button type="primary" className="stc-button" onClick={handleClick} icon="play-circle">
                   Ver Tutoriales
                </Button> */}
                <Button type="primary" className="stc-button" onClick={handleClick}>
                   Ver Tutoriales
                </Button>
              </Col>
            </Row>  
          </Modal>
          ):(
            <Modal
                title="Vertically centered modal dialog"
                width={620}
                centered
                visible={openModal}
                onOk={closeModal}
                onCancel={closeModal}
                className="stc-modal-horizontal"
              >
              <Row type="flex" justify="center" className="icons-list">
                <Col xs={15} sm={15} md={15} lg={15} xl={15} xxl={15} style={{textAlign:'center'}}>
                  <Row style={{paddingRight:'1.6rem', paddingLeft:'1.6rem'}}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <h1>Activa tu Banca Digital</h1>
                      <p style={{ fontFamily: 'neo_sans_rglr'}}>Si deseas crear tu usuario de Atlántida Online o abrir una cuenta de ahorro <strong style={{fontFamily:'neo_sans_bld'}}>descarga Atlántida Móvil</strong>  y selecciona la opción Activa tu Banca Digital.</p>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
                      <a href="https://play.google.com/store/apps/details?id=hn.com.enterprise.bancatlanapp" target="_blank" rel="noopener noreferrer" className="stc-link">
                        <img alt="PlayStore Banco Atlantida" className="stc-icon-store-size-1" src={playstore} />
                      </a>
                      <a href="https://apps.apple.com/ar/app/atl%C3%A1ntida-m%C3%B3vil/id603339165" target="_blank" rel="noopener noreferrer" className="stc-link">
                        <img alt="AppStore Banco Atlantida" className="stc-icon-store-size-1" src={appstore} />
                      </a>
                      <a href="https://play.google.com/store/apps/details?id=hn.com.enterprise.bancatlanapp" target="_blank" rel="noopener noreferrer" className="stc-link">
                        <img alt="PlayStore Banco Atlantida" className="stc-icon-store-size-1" src={playstore} />
                      </a>
                    </Col>
                  </Row>
                </Col> 
                <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} style={{textAlign:'center'}}>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
                      <Divider type="vertical" />
                    </Col>
                  </Row>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} style={{textAlign:'center'}}>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
                        <img alt="Activa tu Banca Digital" className="stc-icon-store-size-2" src={activa} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:'center'}}>
                      <Button type="primary" className="stc-button-1" onClick={handleClick} size="default">
                        Ver Tutoriales
                      </Button>
                    </Col>
                  </Row>
                </Col>
            </Row> 
            </Modal>
          )
        }            
        </>
    );
};

export default Popup;

