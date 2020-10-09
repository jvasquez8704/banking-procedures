import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Card } from 'antd';
import Content from './Content';

import Tab from './Tab';
import img1 from '../../img/unlock.svg';
import img2 from '../../img/ach.svg';
import img3 from '../../img/reset.svg';

import Verify from '../common/Verify';
import Success from '../common/Success';
import Unlock from '../unlock/UnlockUser';
import EnableACH from '../ach/EnableACH';
import AgreementACH from '../ach/AgreementACH';
import ResetPassword from '../reset/ResetPassword';

import { setTab, updateStep } from '../../actions/ui';

const TabsCard = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    key: 'tab1',
    description: 'Desbloqueo de usuario de Atlántida Online'
  });

  const { key, description } = state;

  const tabList = [
    {
      key: 'tab1',
      tab: <Tab className="anal" image={img1} desc="Desbloqueo de usuario de Atlántida Online" />,
    },
    {
      key: 'tab2',
      tab: <Tab image={img2} desc="Habilitar transferencias a otros bancos(ACH)" />,
    },
    {
      key: 'tab3',
      tab: <Tab image={img3} desc="Restablecer contraseña de Atlántida Online" />,
    },
    // {
    //   key: 'tab4',
    //   tab: <p>Cheques</p>,
    // },
  ];

  const unlockJourney = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'unlock',
      content: <Unlock />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const achJourney = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'unlock',
      content: <Unlock />,
    },
    {
      key: 'agreement',
      content: <EnableACH />,
    },
    {
      key: 'enrolment',
      content: <AgreementACH />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const resetJourney = [
    {
      key: 'init',
      content: <Verify />,
    },
    {
      key: 'reset',
      content: <ResetPassword />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const journeys = {
    tab1: unlockJourney,
    tab2: achJourney,
    tab3: resetJourney
  };

  // const onTabChange = (key, type) => {
  //   const tab = parseInt(key.replace('tab',''));
  //   dispatch(updateStep(0));//restar journey 
  //   dispatch(setTab(tab));
  //   setState({
  //     ...state,
  //     [type]: key
  //   });
  // };
  
  const onTabChange = (key, description) => {
    const tab = parseInt(key.replace('tab',''));
    dispatch(updateStep(0));//restar journey 
    dispatch(setTab(tab));
    setState({
      ...state,
      key,
      description
    });
  };

  return (
    <div>
      <Card
        style={{ width: '100%', textAlign: 'center' }}
        title={<h1>Tus accesos de Banca Personal sin salir de casa</h1>}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => {
          const tab = parseInt(key.replace('tab', ''));
          onTabChange(key, tabList[tab - 1].tab.props.desc);
        }}
        className="stc-tabs ant-row ant-row-center ant-row-middle"
      >
        <Content steps={journeys[key]} desc={description} />
      </Card>
      <Tabs
        style={{ width: '100%', textAlign: 'center' }}
        title={<h1>Tus accesos de Banca Personal sin salir de casa</h1>}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => {
          const tab = parseInt(key.replace('tab', ''));
          onTabChange(key, tabList[tab - 1].tab.props.desc);
        }}
        className="stc-tabs ant-row ant-row-center ant-row-middle"
      >
        {/* <Content steps={journeys[key]} desc={description} /> */}
      </Tabs>
    </div>
  );
};

export default TabsCard;