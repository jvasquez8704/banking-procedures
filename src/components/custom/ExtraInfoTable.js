import React from 'react';
import { Descriptions } from 'antd';

const ExtraInfoTable = ({ info }) => {
    const { localCurrency, interCurrency } = info;
    const { extralocallimit, extralocalinitial, extralocalfinal, extralocalavailable } = localCurrency;
    const { extrainterlimit, extrainterinitial, extrainterfinal, extrainteravailable } = interCurrency;
   
    return (
        <>
            <Descriptions
                title="Moneda Local"
                layout="vertical"
                size="small"
                column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 1, xs: 1 }}
                bordered
            >
                <Descriptions.Item label="Limite">{extralocallimit}</Descriptions.Item>
                <Descriptions.Item label="Saldo inicial">{extralocalinitial}</Descriptions.Item>
                <Descriptions.Item label="Saldo final">{extralocalfinal}</Descriptions.Item>
                <Descriptions.Item label="Disponible">{extralocalavailable}</Descriptions.Item>
            </Descriptions>
            <br></br>
            <Descriptions
                title="Moneda Extranjera"
                layout="vertical"
                size="small"
                column={{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 1, xs: 1 }}
                bordered
            >
                <Descriptions.Item label="Limite">{extrainterlimit}</Descriptions.Item>
                <Descriptions.Item label="Saldo inicial">{extrainterinitial}</Descriptions.Item>
                <Descriptions.Item label="Saldo final">{extrainterfinal}</Descriptions.Item>
                <Descriptions.Item label="Disponible">{extrainteravailable}</Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default ExtraInfoTable;