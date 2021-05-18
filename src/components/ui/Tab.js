import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { activeAdvertisement } from '../../actions/ui';
const { Meta } = Card;

const Tab = ({ id, image, desc, getCurrentTab }) => {

    const currentTab = useSelector(({ ui }) => ui.tab);
    const dispatch = useDispatch();
    
    const onTab = () => {
        getCurrentTab(id, desc);
        if( id!== 2 ) {
            dispatch(activeAdvertisement(true));
        }
    }
    return (
        <div className={`stc-tab-border ${id === currentTab ? 'stc-selected-tab' : ''}`}>
            <Card
                hoverable
                cover={<img alt={desc.title || ''} src={image || ''} className="stc-icon-size" />}
                className="stc-tab"
                onClick={onTab}
            >
                <Meta title={desc.title || ''} />
            </Card>
            <div className="stc-card-selected-border"></div>
        </div>
    );
};

export default Tab;