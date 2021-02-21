import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Steps, Spin, Card, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { unsetError } from '../../actions/ui';
import Popup from '../common/Modal';
import iconErr from '../../res/img/alert_icon.svg';


const StepScreen = ({ steps, desc }) => {
    const { Step } = Steps;
    const { step: current, loading, err } = useSelector(({ ui }) => ui);
    const dispatch = useDispatch();
    
    /**
     useEffect(() => {
        console.log('Capturando error => ', err);
    }, [err]);

    const onChange = current => {
        console.log(current);
    };
     */
    /*General Loader*/
    const antIcon = <LoadingOutlined style={{ fontSize: 24 , color:'red'}} spin />
    const hideModal = () => {
        dispatch(unsetError());
    }

    return (
        <div className="stc-content">
            <div className="stc-card-title">
                <Modal
                    title="Error"
                    visible={err && true}
                    onCancel={hideModal}
                    footer={null}
                    className="stc-error-modal stc-modal"
                >
                    <img alt="Error img" className="stc-err-icon" src={iconErr} />
                    <p className="stc-err-title">¡Error!</p>
                    <p>{err}</p>
                </Modal>
            </div>
            <Card title={desc} className="stc-card-widget">
                <Steps
                    type="navigation"
                    current={current}
                    className="site-navigation-steps"
                    status={`${ err ? 'error': 'process'}`}
                >
                    {steps && steps.map( ( item, idx ) => (
                        // <Step key={item.key} title={`${idx === current && err ? err : ''}`} />
                        <Step key={item.key}/>
                    ))}

                </Steps>
                <Spin indicator={antIcon} spinning={loading} >
                    {steps && steps[current].content}
                </Spin>
                <Popup />
            </Card>
        </div>
    );
};

export default StepScreen;