import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Content from './Content';

import logo from '../../res/img/logo-basa.svg';
import img1 from '../../res/img/pinChange.svg';
import img2 from '../../res/img/updateUserInfo.svg';
import img3 from '../../res/img/blockingCard.svg';
import img4 from '../../res/img/creditLimit.svg';
import img5 from '../../res/img/inquiryStatement.svg';
import { title } from '../../constants/constants';

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
        title: title.changePINTitle,
        subtitle: title.changePINSubtitle
      },
    },
    {
      key: 5,
      img: img5,
      desc: {
        title: title.inquiryTitle,
        subtitle: title.inquirySubtitle
      },
    },
    {
      key: 2,
      img: img2,
      desc: { 
        title: title.infoTitle,
        subtitle: title.infoSubtitle 
      },
    },
    {
      key: 3,
      img: img3,
      desc: {
        title: title.lockingTitle,
        subtitle: title.lockingSubtitle
      },
    }, 
    {
      key: 4,
      img: img4,
      desc: {
        title: title.creditLimitTitle,
        subtitle: title.creditLimitSubtitle
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
          alt={title.branding}
          className="stc-landing-logo-header"
          src={logo}
        />
      </div>
      <Tabs
        title={title.main}
        className="stc-tabs ant-row ant-row-center ant-row-middle"
        tabList={tabList}
        onTabChange={onTabChange}
      ></Tabs>
      <Content steps={journeys[key]} desc={subtitle} />
    </div>
  );
};

export default TabsCard;