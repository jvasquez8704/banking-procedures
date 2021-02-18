import React from 'react';
import { Descriptions } from 'antd';

const CardInfoTable = ({ info }) => {
    const { availablelocal, availableinter, limitlocal, limitinter } = info;    
    return (
        <Descriptions
        title="Estado actual de tarjeta"
        layout="vertical"
        size="small"
        column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 1, xs: 1 }}
        bordered
         >
            <Descriptions.Item label="Disponible moneda local">{availablelocal}</Descriptions.Item>
            <Descriptions.Item label="Disponible moneda extranjera">{availableinter}</Descriptions.Item>
            <Descriptions.Item label="Límite moneda local">{limitlocal}</Descriptions.Item>
            <Descriptions.Item label="Límite moneda extranjera">{limitinter}</Descriptions.Item>
        </Descriptions>
    );
};

export default CardInfoTable;