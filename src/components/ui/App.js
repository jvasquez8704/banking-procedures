import React from 'react';
import { Layout } from 'antd';

import TabsCard from './TabsCard';

const { Content } = Layout;

const MainContent = () => {
    return (
      <Layout>
        <Content className="stc-main-content">
          <div className="stc-landing">
            <TabsCard />
            <div className="stc-new-footer">
              Para dudas o consultas puedes comunicarte a nuestro Call Center a
              los teléfonos: Tegucigalpa 2280-1010, San Pedro Sula 2580-1010, La
              Ceiba 2480-1010
            </div>
          </div>
        </Content>
      </Layout>
    );
};

export default MainContent;