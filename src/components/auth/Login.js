import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'antd';
import { useForm as validatorForm } from "react-hook-form";
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { LoginCustomer } from '../../actions/auth';
import { unsetError, updateStep } from '../../actions/ui';
import CustomInput from '../ui/form/CustomInput';

const UnlockUser = () => {
    const { handleSubmit, errors , control } = validatorForm();
    const dispatch = useDispatch();
    const identity = useSelector(({ auth }) => auth.identity);
    const [handleInputChange] = useForm({ username: '', token: '' });

    const handleLogin = ({ username, token }) => {
      dispatch(LoginCustomer({identity, username, token}));
    }

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());
    }

    const handleKeyPress = e => {
      let key = e.which || e.keyCode || e.charCode;
      if (e.target.name === 'token' && !validator.isNumeric(e.key)) {
        e.preventDefault();
        return;
      }
        
      if (e.target.name === 'token' && e.target.value.length > 7 && key !== 8) {
            e.preventDefault();
            return;
      }
    }
    
    const handleKeyDown = e => {
        let key = e.which || e.keyCode || e.charCode;   
    }

    return (
      <Form
        name="basic"
        layout="vertical"
        className="stc-form"
        onSubmit={handleSubmit(handleLogin)}
      >
        <CustomInput
          fieldName="username"
          iLabel="Usuario de tu Banca Digital"
          errMjs={errors.username && errors.username.message}
          iTypeErr={`${errors.username ? "error" : ""}`}
          iPlaceholder="Ingresa tu usuario"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa tu usuario",
            },
            pattern: {
              value: /^([a-zA-Z0-9]|#|-|\.|_|#|Ñ|ñ)*$/,
              message: "Por favor ingresa un token valido",
            },
            maxLength: {
              value: 10,
              message: "Por favor ingresa un usuario valido",
            },
            minLength: {
              value: 4,
              message: "Por favor ingresa un usuario valido",
            },
          }}
        />
        <CustomInput
          fieldName="token"
          iLabel="Token"
          errMjs={errors.token && errors.token.message}
          iTypeErr={`${errors.token ? "error" : ""}`}
          iPlaceholder="Ingresa tu Token"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          icontrol={control}
          irules={{
            validate: (value) =>
              value.length !== 8 ? "Por favor ingresa tu token" : undefined,
            required: {
              value: true,
              message: "Por favor ingresa tu token",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "Por favor ingresa un token valido",
            },
          }}
        />
        <Form.Item>
          <Button
            type="primary"
            className="stc-button"
            htmlType="submit"
            style={{ background: "#d9272e" }}
          >
            Siguiente
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            className="btn stc-button-default"
            htmlType="button"
            onClick={handleBack}
          >
            Atrás
          </Button>
        </Form.Item>
      </Form>
    );
};

export default UnlockUser;