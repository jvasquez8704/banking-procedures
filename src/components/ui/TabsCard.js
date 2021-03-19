import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Content from './Content';

import logo from '../../res/img/logo-basa.svg';
import img1 from '../../res/img/pinChange.svg';
import { title } from '../../constants/constants';

import Login from '../auth/Login';
import Success from '../common/Success';

import Checks from '../service/Checks';

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
        title: title.changePINTitle,
        subtitle: title.changePINSubtitle
      },
    },
  ];

  const [state, setState] = useState({
    key: getModule(),
    description: {
      title: title.changePINTitle,
      subtitle: title.changePINSubtitle
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
      key: 'login',
      content: <Login />,
    },
    {
      key: 'manage-pin',
      content: <Checks />,
    },
    {
      key: 'success',
      content: <Success />,
    },
  ];
  
  const journeys = {
    1: changePinJourney
  };

  return (
    <div>
      <div className="stc-landing-top">
        <img
          alt={title.branding}
          className="stc-landing-logo-header"
          src={logo}
        />
      </div>
      <Content steps={journeys[key]} 
        // desc="Consulta de Cheques Banca Corporativa"
        desc="Consulta de Cheques Comercial Pyme"
      />
    </div>
  );
};

export default TabsCard;