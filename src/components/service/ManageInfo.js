import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import { useForm as validatorForm } from "react-hook-form";

import { setError, unsetError, updateStep } from '../../actions/ui';
import { getCities, getStatesCountry, setUserInfo } from '../../actions/service';
import { useForm } from '../../hooks/useForm';
import CustomInput from '../ui/form/CustomInput';
import CustomSelect from '../ui/form/CustomSelect';
import SelectList from '../ui/form/SelectList';

const InfoUpdater = () => {
    const { handleSubmit, errors , control } = validatorForm();
    const dispatch = useDispatch();
    const [maritalStatus, setMaritalStatus] = useState('')
    const [mobileLength, setMobileLength] = useState('');
    const [telephoneLength, setTelephoneLength] = useState('');
    const [addressLength, setAddressLength] = useState('');
    const [workAddressLength, setWorkAddressLength] = useState('');
    const [emailLength, setEmailLength] = useState('');
    const [countryStateLength, setCountryStateLength] = useState('');
    const [cityLength, setCityLength] = useState('');
    const [city, setCity] = useState('');
    const [countryState, setCountryState] = useState('');
    const [shippingAddressLength, setShippingAddressLength] = useState('');
    const data = useSelector(({ ach, ui, auth }) => ({ ach, auth }));
    const { ach:info, auth } = data;
    const { customerCorePhone, customerCoreEmail, maritalStatuses, stateCountryList, cityList } = info;
    const [ handleInputChange ] = useForm({ address: '', workAddress: '',mobile: '',telephone: '', email: '', countryState: '', city: '' });

    useEffect(() => {
      console.log('Departamentos: ', !stateCountryList);
      !stateCountryList &&  dispatch(getStatesCountry());
    }, [countryState])

    const handleOnSubmit = ({address, workAddress, mobile, telephone, email, shippingAddress }) => {
        const { identity } = auth;
        const { token } = info;

        if (maritalStatus === '') {
          dispatch(setError('Selecciona estado civil'));
          return;
        }

        if (countryState === '') {
          dispatch(setError('Selecciona un departamento'));
          return;
        }

        if (city === '') {
          dispatch(setError('Selecciona ciudad'));
          return;
        }

        dispatch(setUserInfo(identity, token, {address, workAddress, mobile, telephone, email, maritalStatus, countryState, city, shippingAddress}));
    } 

    const handleBack = () => {
        dispatch(updateStep(0));
        dispatch(unsetError());
    }

    const handleChangeMaritalStatus = value => {
      setMaritalStatus(value);
    }

    const handleChangeStatuses = value => {
      console.log('Depto: ', value);
      setCountryState(value);
      dispatch(getCities(value));
    }
    
    const handleChangeCities = value => {
      console.log('Ciudad', value);
      setCity(value);
    }

    const handleKeyPress = e => {
        const { name } = e.target;
        if (name === 'mobile' && mobileLength.length > 7) {
            e.preventDefault();
            return;
        }
        
        if (name === 'telephone' && telephoneLength.length > 7) {
            e.preventDefault();
            return;
        }

        if (name === 'address' && addressLength.length > 80) {
            e.preventDefault();
            return;
        }

        if (name === 'workAddress' && workAddressLength.length > 94) {
          e.preventDefault();
          return;
        }

        if (name === 'email' && emailLength.length > 29) {
          e.preventDefault();
          return;
        }

        if (name === 'countryState' && countryStateLength.length > 11) {
          e.preventDefault();
          return;
        }
        
        if (name === 'city' && cityLength.length > 11) {
          e.preventDefault();
          return;
        }
        
        if (name === 'shippingAddress' && shippingAddressLength.length > 119) {
          e.preventDefault();
          return;
        }

        if ((name === 'mobile' || name === 'telephone') && isNaN(e.key)) {
            e.preventDefault();
            return;
        }

        name === 'mobile' && setMobileLength(mobileLength + e.key);
        name === 'telephone' && setTelephoneLength(telephoneLength + e.key);
        name === 'address' && setAddressLength(addressLength + e.key)
        name === 'workAddress' && setWorkAddressLength(workAddressLength + e.key)
        name === 'email' && setEmailLength(emailLength + e.key)
        name === 'countryState' && setCountryStateLength(countryStateLength + e.key)
        name === 'city' && setCityLength(cityLength + e.key)
        name === 'shippingAddress' && setShippingAddressLength(shippingAddressLength + e.key)
    }
    
    const handleKeyDown = e => {
        let key = e.which || e.keyCode || e.charCode;
        let { name } = e.target;
        name === 'mobile' && key === 8 && setMobileLength(mobileLength.slice(0, -1));
        name === 'telephone' && key === 8 && setTelephoneLength(telephoneLength.slice(0, -1));
        name === 'address' && key === 8 && setAddressLength(addressLength.slice(0, -1)); 
        name === 'workAddress' && key === 8 && setWorkAddressLength(workAddressLength.slice(0, -1));
        name === 'email' && key === 8 && setEmailLength(emailLength.slice(0, -1));           
        name === 'countryState' && key === 8 && setCountryStateLength(countryStateLength.slice(0, -1));           
        name === 'city' && key === 8 && setCityLength(cityLength.slice(0, -1));           
        name === 'shippingAddress' && key === 8 && setShippingAddressLength(shippingAddressLength.slice(0, -1));           
        
    }

    return (
      <Form
        name="basic"
        layout="vertical"
        className="stc-form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <CustomInput
          fieldName="address"
          iLabel="Dirección de domicilio"
          errMjs={errors.address && errors.address.message}
          iTypeErr={`${errors.address ? "error" : ""}`}
          iPlaceholder="Ingresa dirección de domicilio"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa dirección de domicilio",
            },
          }}
        />
        <CustomInput
          fieldName="workAddress"
          iLabel="Dirección de trabajo"
          errMjs={errors.workAddress && errors.workAddress.message}
          iTypeErr={`${errors.workAddress ? "error" : ""}`}
          iPlaceholder="Ingresa dirección de trabajo"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa dirección de trabajo",
            },
          }}
        />
        <CustomInput
          fieldName="mobile"
          iLabel="Telefono celular"
          errMjs={errors.mobile && errors.mobile.message}
          iTypeErr={`${errors.mobile ? "error" : ""}`}
          iPlaceholder="Ingresa telefono celular"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          icontrol={control}
          idefaultValue={customerCorePhone}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa telefono celular",
            },
          }}
        />
        <CustomInput
          fieldName="telephone"
          iLabel="Telefono de casa"
          errMjs={errors.telephone && errors.telephone.message}
          iTypeErr={`${errors.telephone ? "error" : ""}`}
          iPlaceholder="Ingresa telefono de casa"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa telefono de casa",
            },
          }}
        />
        <CustomInput
          fieldName="email"
          iLabel="Correo electrónico"
          errMjs={errors.email && errors.email.message}
          iTypeErr={`${errors.email ? "error" : ""}`}
          iPlaceholder="Ingresa correo electrónico"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          idefaultValue={customerCoreEmail}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa correo electrónico",
            },
          }}
        />

        <CustomSelect
          fieldName="marital-statuses"
          iLabel="Estado Civil"
          errMjs="Por favor selecciona estado civil"
          iPlaceholder="Selecciona estado civil"
          items={maritalStatuses}
          iHandleSelectChange={handleChangeMaritalStatus}
          irules={{
            required: {
              value: true,
              message: "Se requiere estado civil",
            },
          }}
        />
        {/* <CustomInput
          fieldName="countryState"
          iLabel="Departamento"
          errMjs={errors.countryState && errors.countryState.message}
          iTypeErr={`${errors.countryState ? "error" : ""}`}
          iPlaceholder="Ingresa departamento"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa departamento",
            },
          }}
        /> */}

        <SelectList
          fieldName="countryState"
          iLabel="Departamento"
          errMjs="Por favor selecciona un departamento"
          iPlaceholder="Selecciona departamento"
          items={stateCountryList}
          iHandleSelectChange={handleChangeStatuses}
          irules={{
            required: {
              value: true,
              message: "Se requiere departamento",
            },
          }}
        />

        {/* <CustomInput
          fieldName="city"
          iLabel="Ciudad"
          errMjs={errors.city && errors.city.message}
          iTypeErr={`${errors.city ? "error" : ""}`}
          iPlaceholder="Ingresa ciudad"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa ciudad",
            },
          }}
        /> */}

        <SelectList
          fieldName="city"
          iLabel="Ciudad"
          errMjs="Por favor selecciona ciudad"
          iPlaceholder="Selecciona ciudad"
          items={cityList}
          iHandleSelectChange={handleChangeCities}
          irules={{
            required: {
              value: true,
              message: "Se requiere ciudad",
            },
          }}
        />

        <CustomInput
          fieldName="shippingAddress"
          iLabel="Dirección de envío"
          errMjs={errors.shippingAddress && errors.shippingAddress.message}
          iTypeErr={`${errors.shippingAddress ? "error" : ""}`}
          iPlaceholder="Ingresa dirección de envío"
          ihandleInputChange={handleInputChange}
          ihandleKeyPress={handleKeyPress}
          ihandleKeyDown={handleKeyDown}
          icontrol={control}
          irules={{
            required: {
              value: true,
              message: "Por favor ingresa dirección de envío",
            },
          }}
          itoolTip={'Colocar dirección física o correo electrónico'}
        />

        <Form.Item>
          <Button type="primary" className="stc-button" htmlType="submit">
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

        <Form.Item name="normal-message">
          <p>
            Nota: Recuerda que los datos de correo y teléfono son los que
            anteriormente le has proporcionado a Banco Atlántida para
            comunicarse contigo.
          </p>
        </Form.Item>
      </Form>
    );
};

export default InfoUpdater;