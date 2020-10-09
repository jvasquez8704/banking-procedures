import React from 'react';
import { useDispatch } from 'react-redux';
import { Select } from 'antd';
import { setAchAccount } from '../../actions/ach';

const { Option } = Select;

const CustomSelect = ({ items, getAccount }) => {

    const dispatch = useDispatch();

    const handleChange = value => {
        dispatch(setAchAccount(value));
        getAccount(value);
    }

    return (
        <Select defaultValue="Seleccione una Cuenta" onChange={handleChange}>
            {items && items.map(item => <Option key={item.product} value={item.product}>{item.mask}</Option>)}
        </Select>
    );
};

export default CustomSelect;