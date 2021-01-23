import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Content from './Content';

import logo from '../../res/img/logo.svg';
import img1 from '../../res/img/unlock.svg';
import img2 from '../../res/img/ach2.svg';
import img3 from '../../res/img/reset.svg';

import PreLogin from '../auth/PreLogin';
import Login from '../auth/Login';
import ResetPassword from '../auth/ResetPassword';
import Success from '../common/Success';
import EnableACH from '../ach/EnableACH';

import { setTab, updateStep } from '../../actions/ui';
import Tabs from '../custom/Tabs';
import { getModule } from '../../helpers/util';

const TabsCard = () => {
  const dispatch = useDispatch();
  const tabList = [
    {
      key: 1,
      img: img1,
      desc: "Desbloqueo de usuario"
    },
    {
      key: 2,
      img: img2,
      desc: "Habilitar ACH"
    },
    {
      key: 3,
      img: img3,
      desc: "Restablecer contraseña"
    }
  ];

  const [state, setState] = useState({
    key: getModule(),
    description: 'Desbloqueo de usuario'
  });

  useEffect(() => {
    dispatch(setTab(key));
    const tab = tabList.filter( item => key === item.key );
    if(tab.length){
    setState({...state, description: tab[0].desc});  
    }
  }, [getModule])

  const { key, description } = state;
  
  const unlockJourney = [
    {
      key: 'init',
      content: <PreLogin />,
    },
    {
      key: 'unlock',
      content: <Login />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const achJourney = [
    {
      key: 'init',
      content: <PreLogin />,
    },
    {
      key: 'unlock',
      content: <Login />,
    },
    {
      key: 'agreement',
      content: <EnableACH />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const resetJourney = [
    {
      key: 'init',
      content: <PreLogin />,
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
    1: unlockJourney,
    2: achJourney,
    3: resetJourney
  };
  
  const onTabChange = (key, description) => {
    dispatch(updateStep(0));//restar journey 
    dispatch(setTab(key));
    setState({
      key,
      description
    });
  };

  return (
    <div>
      <div className="stc-header-top-row">
        <img alt="Logo Banco Atlantida" className="stc-landing-header" src={logo} />
      </div>
      <Tabs
        title={"Accesos a tu Banca Digital"}
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