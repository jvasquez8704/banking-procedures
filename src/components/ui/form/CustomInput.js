import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Controller } from "react-hook-form";

const CustomInput = ({fieldName, iLabel, iTypeErr, errMjs, iPlaceholder, ihandleInputChange, ihandleKeyPress, ihandleKeyDown, icontrol, irules, iToolTip}) => {
    return (
        <Row type="flex" justify="center">
            <Col xs={22} sm={22} md={16} lg={16} xl={14} xxl={14}>
            <Form.Item
                name={fieldName}
                label={iLabel}
                validateStatus={iTypeErr}
                help={errMjs}
            >
                { iToolTip && <p className="stc-tooltip">{ iToolTip }</p> }
                 <Controller
                        as={Input}
                        name={fieldName}
                        placeholder={iPlaceholder}
                        onChange={ihandleInputChange}
                        onKeyPress={ihandleKeyPress}
                        onKeyDown={ihandleKeyDown}
                        control={icontrol}
                        rules={irules}
                        defaultValue=''
                    />
            </Form.Item>
            </Col>
        </Row>
    );
};

export default CustomInput;