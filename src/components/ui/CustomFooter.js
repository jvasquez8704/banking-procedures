import React from 'react';
import { Col, Row, Typography } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled, YoutubeFilled } from '@ant-design/icons';
import logo from '../../res/img/white-logo.svg';

const { Text, Title } = Typography;
const CustomFooter = () => {
    return (
        <div className="stc-footer">
            <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <img alt="Logo Banco Atlantida" className="stc-landing-header" src={logo} />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <div className="stc-address">
                        <Title level={4} style={{color:'#fff'}}>Oficina Principal:</Title>
                        <br/>
                        <Text style={{color:'#fff'}}>Plaza Bancatlán, Blvd. Centroamérica,</Text>
                        <br/>
                        <Text style={{color:'#fff'}}> Tegucigalpa, Fco. Morazán.</Text>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Row type="flex" justify="center" className="icons-list">
                        <Col xs={3} sm={3} md={4} lg={3} xl={3} xxl={2}>
                            <FacebookFilled style={{ fontSize: '2.25rem' }} />
                        </Col>
                        <Col xs={3} sm={3} md={4} lg={3} xl={3} xxl={2}>
                            <InstagramFilled style={{ fontSize: '2.25rem' }} />
                        </Col>
                        <Col xs={3} sm={3} md={4} lg={3} xl={3} xxl={2}>
                            <TwitterCircleFilled style={{ fontSize: '2.25rem' }} />
                        </Col>
                        <Col xs={3} sm={3} md={4} lg={3} xl={3} xxl={2}>
                            <YoutubeFilled style={{ fontSize: '2.25rem' }} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row type="flex" justify="center" className="stc-footer-base">
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <div className="stc-footer-site">
                        <Text style={{color:'#fff'}}>www.bancatlan.hn</Text>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CustomFooter;