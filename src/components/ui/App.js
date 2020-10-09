import React from 'react';
//import React, { useEffect } from 'react';
//import { useSelector } from 'react-redux';
//import { Layout, message } from 'antd';
import { Layout } from 'antd';

import TabsCard from './TabsCard';
import logo from '../../res/img/logo.svg';
import CustomFooter from './CustomFooter';

const { Header, Footer, Content } = Layout;

const MainContent = () => {
    /*
     *Cambio para mostrar errores con modal
      const mjsErr = useSelector(({ ui }) => ui.err);
        useEffect(() => {
        console.log('La gente busca arte!!!', mjsErr);
        if (mjsErr) {
            message.error(mjsErr);
        }
    }, [mjsErr]);

    const handleClick = () => {
        message.success('Processing complete!');
    }
    */

    return (
        <Layout>
            <Header className="stc-header-top-row" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <img alt="Logo Banco Atlantida" className="stc-landing-header" src={logo}/>
            </Header>
            <Content>
                <TabsCard />
            </Content>
            {/* <Footer onClick={handleClick}> */}
            <Footer>
                <CustomFooter/>
            </Footer>
        </Layout>
    );
};

export default MainContent;