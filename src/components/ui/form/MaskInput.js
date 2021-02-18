import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import NumberFormat from "react-number-format";
import { Controller } from "react-hook-form";

const MaskInput = ({fieldName, iLabel, iTypeErr, errMjs, iPlaceholder, ihandleInputChange, ihandleKeyPress, ihandleKeyDown, idefaultValue, icontrol, irules}) => {
    return (
        <Row type="flex" justify="center">
            <Col xs={22} sm={22} md={16} lg={16} xl={14} xxl={14}>
            <Form.Item
                name={fieldName}
                label={iLabel}
                validateStatus={iTypeErr}
                help={errMjs}
            >
                 <Controller
                        as={
                            <NumberFormat
                                customInput={Input}
                                thousandSeparator={true}
                                allowLeadingZeros={false}
                                prefix={"$ "}
                                suffix={".00"}
                                onValueChange={(v) => parseInt(v.value)}
                            />
                        }
                        name={fieldName}
                        placeholder={iPlaceholder}
                        onChange={ihandleInputChange}
                        onKeyPress={ihandleKeyPress}
                        onKeyDown={ihandleKeyDown}
                        control={icontrol}
                        rules={irules}
                        defaultValue={`${ idefaultValue || '' }`}
                    />
            </Form.Item>
            </Col>
        </Row>
    );
};

export default MaskInput;