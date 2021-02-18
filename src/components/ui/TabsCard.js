import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Content from './Content';

import logo from '../../res/img/logo_red.svg';
import img1 from '../../res/img/pinChange.svg';
import img2 from '../../res/img/updateUserInfo.svg';
import img3 from '../../res/img/blockingCard.svg';
import img4 from '../../res/img/creditLimit.svg';
import img5 from '../../res/img/inquiryStatement.svg';

import PreLogin from '../auth/PreLogin';
import Login from '../auth/Login';
import Success from '../common/Success';

import ChangePin from '../service/ChangePin';
import ManageInfo from '../service/ManageInfo';
import PIBlocking from '../service/PIBlocking';
import CreditLimit from '../service/CreditLimit';
import BalanceInquiry from '../service/BalanceInquiry';

import { setTab, updateStep } from '../../actions/ui';
import Tabs from '../custom/Tabs';
import { getModule } from '../../helpers/util';

const TabsCard = () => {
  const dispatch = useDispatch();
  const tabList = [
    {
      key: 1,
      img: img1,
      desc: {
        title: "Cambio de PIN",
        subtitle: "Cambio de PIN"
      },
    },
    {
      key: 2,
      img: img2,
      desc: { 
        title: "Actualización de Datos",
        subtitle: "Actualización de Datos" 
      },
    },
    {
      key: 3,
      img: img3,
      desc: {
        title: "Bloqueo Tarjeta",
        subtitle: "Bloqueo Tarjeta"
      },
    }, 
    {
      key: 4,
      img: img4,
      desc: {
        title: "Límite de Crédito",
        subtitle: "Límite de Crédito"
      },
    },
    {
      key: 5,
      img: img5,
      desc: {
        title: "Consulta de Saldos",
        subtitle: "Consulta de Saldos"
      },
    },
  ];

  const [state, setState] = useState({
    key: getModule(),
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

  const changePinJourney = [
    {
      key: 'pre-login',
      content: <PreLogin />,
    },
    {
      key: 'login',
      content: <Login />,
    },
    {
      key: 'manage-pin',
      content: <ChangePin />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const manageInfoJourney = [
    {
      key: 'pre-login',
      content: <PreLogin />,
    },
    {
      key: 'login',
      content: <Login />,
    },
    {
      key: 'manage-info',
      content: <ManageInfo />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const blockingCardJourney = [
    {
      key: 'init',
      content: <PreLogin />,
    },
    {
      key: 'login',
      content: <Login />,
    },
    {
      key: 'bloking-card',
      content: <PIBlocking />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const creditLimitJourney = [
    {
      key: 'init',
      content: <PreLogin />,
    },
    {
      key: 'login',
      content: <Login />,
    },
    {
      key: 'manamge-card-limit',
      content: <CreditLimit />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];

  const balanceInquiryJourney = [
    {
      key: 'init',
      content: <PreLogin />,
    },
    {
      key: 'reset',
      content: <Login />,
    },
    {
      key: 'get-info',
      content: <BalanceInquiry />,
    }
  ];

  const journeys = {
    1: changePinJourney,
    2: manageInfoJourney,
    3: blockingCardJourney,
    4: creditLimitJourney,
    5: balanceInquiryJourney
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
      <Tabs
        title={"Gestión de Tarjetas Atlántida"}
        className="stc-tabs ant-row ant-row-center ant-row-middle"
        tabList={tabList}
        onTabChange={onTabChange}
      ></Tabs>
      <Content steps={journeys[key]} desc={subtitle} />
    </div>
  );
};

export default TabsCard;