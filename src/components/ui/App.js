import React from 'react';
import { Layout } from 'antd';

import { useSelector } from 'react-redux';

import TabsCard from './TabsCard';
import { footer } from '../../constants/constants'
const { Content } = Layout;

const MainContent = () => {
    const {tab, mjs} = useSelector( ({ui}) => ui);
    return (
      <Layout>
        <Content className="stc-main-content">
          <div className="stc-landing">
            <TabsCard />
            <div className="stc-new-footer">
              {`${ tab !== 1 ? footer.common : footer.pinChange }`} 
            </div>
          </div>
        </Content>
      </Layout>
    );
};

export default MainContent;