import React from 'react';
import { Descriptions } from 'antd';

const UserInfoTable = info => {
    const { customerCoreCitizen, customerCoreEmail, customerCoreMarital, customerCoreName, customerCoreNationality, customerCorePhone, customerOCBUser } = info;
    return (
        <Descriptions
            title="Información del Usuario"
            layout="vertical"
            size="small"
            column={{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 1, xs: 1 }}
            bordered
        >
            <Descriptions.Item label="Identidad">{customerCoreCitizen}</Descriptions.Item>
            <Descriptions.Item label="Correo eléctronico">{customerCoreEmail}</Descriptions.Item>
            <Descriptions.Item label="Estado civil">{customerCoreMarital}</Descriptions.Item>

            <Descriptions.Item label="Nombre">{customerCoreName}</Descriptions.Item>
            <Descriptions.Item label="Nacionalidad">{customerCoreNationality}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{customerCorePhone}</Descriptions.Item>
           
            <Descriptions.Item label="Usuario Atlántida Online" span={3}>
                {customerOCBUser}
            </Descriptions.Item>
        </Descriptions>
    );
};

export default UserInfoTable;