import React from 'react';
import { Col, DatePicker, Form, Row } from 'antd';

const CustomRangeDate = () => {
    return (
        <Row type="flex" justify="center">
            <Col xs={22} sm={22} md={16} lg={16} xl={14} xxl={14}>
                <Form.Item
                    label="Rango de fechas"
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Form.Item
                        validateStatus="error"
                        help="Please select the correct date"
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 12px)',
                        }}
                    >
                        <DatePicker />
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
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 12px)',
                        }}
                    >
                        <DatePicker />
                    </Form.Item>

                </Form.Item>
            </Col>
        </Row>
    );
};

export default CustomRangeDate;