import React, {useState} from 'react';
import { Col, Form, Row, Select } from 'antd';
import { Controller } from "react-hook-form";
import { getMonthNameByNumber } from '../../../helpers/util';

const { Option } = Select;

const CustomDate = ({ iLabel, mainName, extraName, mainItems , extraItems, setMainKeyValue, setExtraKeyValue, mainDefaulValue, extraDefaulValue, mainErrorMjs, extraErrorMjs, mainError, extraError, mainRules, extraRules, icontrol}) => {

    const [keyControl, setKey] = useState('');

    const iHandleSelectChange = (key, value) => {
        if (key === 'key1') {
            setKey(value);
            setMainKeyValue(value);
        }
        
        if (key === 'key2') {
            setExtraKeyValue(value);
        }
    }

    return (
        <Row type="flex" justify="center">
            <Col xs={22} sm={22} md={16} lg={16} xl={14} xxl={14}>
                <Form.Item
                    label={iLabel}
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Form.Item
                        validateStatus={mainError}
                        help={mainErrorMjs}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 12px)',
                            marginBottom: '0'
                        }}
                    >
                        <Select defaultValue={mainDefaulValue} onChange={e => iHandleSelectChange('key1', e)}>
                            {
                                mainItems && mainItems.map(year => <Option key={`#${year}`} value={year}>{year}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <span
                        style={{
                            display: 'inline-block',
                            width: '24px',
                            lineHeight: '32px',
                            textAlign: 'center',
                        }}
                    >
                        -
                    </span>
                    <Form.Item
                        validateStatus={extraError}
                        help={extraErrorMjs}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 12px)',
                            marginBottom: '0'
                        }}
                    >
                        <Select defaultValue={extraDefaulValue} onChange={e => iHandleSelectChange('key2', e)}>
                            {
                                extraItems && extraItems[keyControl] && extraItems[keyControl].map(item => <Option key={item.line} value={item.month}>{getMonthNameByNumber(item.month)}</Option>)
                            }
                        </Select>
                    </Form.Item>

                </Form.Item>
            </Col>
        </Row>
    );
};

export default CustomDate;