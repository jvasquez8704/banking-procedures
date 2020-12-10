import React from 'react';
import { Layout } from 'antd';

import TabsCard from './TabsCard';
import CustomFooter from './CustomFooter';

const { Header, Footer, Content } = Layout;

const MainContent = () => {
    return (
        <Layout>
            <Content>
                <TabsCard />
            </Content>
            <Footer>
                <CustomFooter/>
            </Footer>
        </Layout>
    );
};

export default MainContent;