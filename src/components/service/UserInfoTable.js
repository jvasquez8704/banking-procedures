import React from 'react';
import { Descriptions } from 'antd';

const UserInfoTable = ({info}) => {
    const { customerCoreName, customerOCBUser } = info;
    return (
        <Descriptions title="Información del Usuario" layout="vertical" bordered>
            <Descriptions.Item label="Usuario Atlántida Online">{customerOCBUser}</Descriptions.Item>
            <Descriptions.Item label="Nombre">{customerCoreName}</Descriptions.Item>
        </Descriptions>
    );
};

export default UserInfoTable;