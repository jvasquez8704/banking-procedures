import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Form, Button } from 'antd';
import { useForm as validatorForm } from "react-hook-form";

import { activeDownload, setError, unsetError, updateStep } from '../../actions/ui';
import UserInfoTable from './UserInfoTable';
import CustomSelect from '../ui/form/CustomSelect';
import { getAgreement, setAchAccount } from '../../actions/service';
import CustomDate from '../ui/form/CustomDate';
import { getKeys, groupByYear } from '../../helpers/util';

const CheckManager = () => {

    const dispatch = useDispatch();
    const data = useSelector(({ ach, ui }) => ({ ach, download: ui.download }));
    const { ach:info, download } = data;
    const accounts = info.products ? info.products.productsItems : [];
    const types = info.docTypes;
    const periods = info.periods ? groupByYear(info.periods.periodsItems) : [];
    const periodKeys = getKeys(periods);
    const [account, setAccount] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [type, setType] = useState('');
    const { handleSubmit, errors , control } = validatorForm();
    const [errs, setErrs] = useState({});

    useEffect(() => {
        if(year.length !== 0){
            setErrs({
                ...errs,
                year: null
            });
        }
        if(month.length !== 0){
            setErrs({
                ...errs,
                month: null
            });
        }
        if(type.length !== 0){
            setErrs({
                ...errs,
                type: null
            });
        }
        if(account.length !== 0){
            setErrs({
                ...errs,
                account: null
            });
        }
    }, [year, month, type, account])

    const handleOnSubmit = () => {
        if(year.length === 0){
            setErrs({
                ...errs,
                year: {message:'Por favor selecciona año', type:'required'}
            });
            return;
        }

        if(month.length === 0){
            setErrs({
                ...errs,
                month: {message:'Por favor selecciona mes', type:'required'}
            });
            return;
        }

        if(type.length === 0){
            setErrs({
                ...errs,
                type: {message:'Por favor selecciona tipo de documento', type:'required'}
            });
            return;
        }

        if(account.length === 0){
            setErrs({
                ...errs,
                account: {message:'Por favor selecciona una cuenta', type:'required'}
            });
            return;
        }
        const { token, customerOCBUser } = info;
        dispatch(getAgreement(token, account, customerOCBUser, year, month, type)); 
        dispatch(updateStep(2));
    }

    const handleChange = value => {
        dispatch(setAchAccount(value));
        setAccount(value);
    }
    
    const handleChangeType = value => {
        setType(value);
    }
    
    const handleClick = () => {
        dispatch(unsetError());      
        window.open(info.urlChecks, "_blank");
    }

    const handleBack = () => {
        dispatch(updateStep(1));
        dispatch(activeDownload(false));
        dispatch(unsetError());      
    }
    
    return (
        <Form
            name="basic"
            layout="vertical"
            className="stc-form stc-manage-checks"
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <Form.Item name="info-item">
               <UserInfoTable info={info} />
            </Form.Item>
            <CustomDate
                iLabel='Seleccione Periodo'
                mainName='year'
                extraName='month'
                mainItems={periodKeys}
                extraItems={periods}
                setMainKeyValue={setYear}
                setExtraKeyValue={setMonth}
                mainDefaulValue='Selecciona año'
                extraDefaulValue='Selecciona mes'
                mainErrorMjs={errs.year && errs.year.message}
                extraErrorMjs={errs.month && errs.month.message}
                mainError={`${errs.year ? 'error' : ''}`}
                extraError={`${errs.month ? 'error' : ''}`}
                icontrol={control}
                mainRules={{
                    validate: value => value === 'Selecciona año' ? "Por favor selecciona año" : undefined
                }}
                extraRules={{
                    validate: value => value === 'Selecciona mes' ? "Por favor selecciona mes" : undefined
                }}
            />
            
            <CustomSelect
                fieldName="type"
                iLabel="Tipo de documento"
                iErrorMjs={ errors.type && errors.type.message }
                iError={`${ errors.type ? 'error': ''}`}

                mainErrorMjs={ errs.type && errs.type.message }
                mainError={`${errs.type ? 'error' : ''}`}

                iPlaceholder="Seleccione tipo de documento"
                items={types}
                iHandleSelectChange={handleChangeType}
                icontrol={control}
                irules={{
                    validate: value => value === 'Seleccione tipo de documento' ? "Por favor selecciona tipo de documento" : undefined
                }}
            />
            
            <CustomSelect
                fieldName="account"
                iLabel="Selecciona una cuenta"
                iErrorMjs={errors.account && errors.account.message}
                iError={`${errors.account ? 'error' : ''}`}

                mainErrorMjs={ errs.account && errs.account.message }
                mainError={`${errs.account ? 'error' : ''}`}

                iPlaceholder="Seleccione una Cuenta de Cheques"
                items={accounts}
                iHandleSelectChange={handleChange}
                icontrol={control}
                irules={{
                    validate: value => value === 'Seleccione una Cuenta de Cheques' ? "Por favor selecciona una cuenta de cheques" : undefined
                }}
            />

            <Form.Item>
                {
                    download ? (
                        <Button type="primary" className="stc-button" htmlType="button" onClick={handleClick}>
                            Descargar
                        </Button>
                    ) : (
                            <Button type="primary" className="stc-button" htmlType="submit">
                                Siguiente
                            </Button>
                        )
                }
            </Form.Item>
            <Form.Item>
                <Button type="default" className="btn stc-button-default" htmlType="button" onClick={handleBack}>
                    Atrás
                </Button>
            </Form.Item>
        </Form>

    );
};

export default CheckManager;