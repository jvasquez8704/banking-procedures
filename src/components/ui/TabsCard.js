import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Content from './Content';

import img1 from '../../res/img/unlock.svg';
import img2 from '../../res/img/ach.svg';
import img3 from '../../res/img/reset.svg';

import Verify from '../common/Verify';
import Success from '../common/Success';
import Unlock from '../unlock/UnlockUser';
import EnableACH from '../ach/EnableACH';
import AgreementACH from '../ach/AgreementACH';
import ResetPassword from '../reset/ResetPassword';

import { setTab, updateStep } from '../../actions/ui';
import Tabs from '../custom/Tabs';

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
      img: img1,
      desc: "Desbloqueo de usuario de Atlántida Online"
    },
    {
      key: 'tab2',
      img: img2,
      desc: "Habilitar transferencias a otros bancos(ACH)"
    },
    {
      key: 'tab3',
      img: img3,
      desc: "Restablecer contraseña de Atlántida Online"
    }
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
      <Tabs
        title={"Tus accesos de Banca Personal sin salir de casa"}
        className="stc-tabs ant-row ant-row-center ant-row-middle"
        tabList={tabList}
        onTabChange={onTabChange}
      >
      </Tabs>
      <Content steps={journeys[key]} desc={description} />
    </div>
  );
};

export default TabsCard;