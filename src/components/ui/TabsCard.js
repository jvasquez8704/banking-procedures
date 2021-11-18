import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Content from './Content';

import logo from '../../res/img/logo-basa.svg';
import img1 from '../../res/img/unlock-icon.svg';
import img2 from '../../res/img/ach-icon.svg';
import Ach_Icon from '../../res/img/ach-new-icon.svg';
import img3 from '../../res/img/resetpass-icon.svg';

import PreLogin from '../auth/PreLogin';
import Login from '../auth/Login';
import ResetPassword from '../auth/ResetPassword';
import Success from '../common/Success';
import EnableACH from '../ach/EnableACH';

import { setTab, updateStep } from '../../actions/ui';
import Tabs from '../custom/Tabs';
import { getModule } from '../../helpers/util';

const TabsCard = () => {
  const { tab: initialTab } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();
  const tabList = [
    // {
    //   key: 1,
    //   img: img1,
    //   desc: {
    //     title: "Desbloqueo de usuario",
    //     subtitle: "Desbloqueo de Usuario de tu Banca Digital"
    //   },
    // },
    {
      key: 2,
      img: img2,
      desc: { 
        title: "Habilitar ACH",
        subtitle: "Habilitar transferencias a otros bancos" 
      },
    }
    // {
    //   key: 3,
    //   img: img3,
    //   desc: {
    //     title: "Restablecer contraseña",
    //     subtitle: "Restablecer contraseña de tu Banca Digital"
    //   },
    // }
  ];

  const [state, setState] = useState({
    key: getModule(initialTab),
    description: {
      title: "Desbloqueo de usuario",
      subtitle: "Desbloqueo de usuario etc..."
    }
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
  const { subtitle } = description;

  return (
    <div>
      <div className="stc-landing-top">
        <img
          alt="Logo Banco Atlantida"
          className="stc-landing-logo-header"
          src={logo}
        />
      </div>
      {/* <Tabs
        title={"Accesos a tu Banca Digital"}
        className="stc-tabs ant-row ant-row-center ant-row-middle"
        tabList={tabList}
        onTabChange={onTabChange}
      ></Tabs> */}
      <div class="stc-landing-title-option">
       {subtitle}
      </div>
      <div className="stc-landing-option-logo">
        <img alt='success process' src={Ach_Icon}
          style={{
            width: "10rem"
          }}
        />
      </div>
      <Content steps={journeys[key]} desc={""} />
    </div>
  );
};

export default TabsCard;