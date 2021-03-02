import { unsecurefetch } from '../helpers/fetch';
import { types } from '../constants/types';
import { mjs } from '../constants/constants';
import { requests } from '../constants/requests';
import { updateStep , setError, unsetError, setLoading, setMessage } from './ui';

export const setStatusCard = (identity, token, card) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2008;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.type = card.type;
        req.request.data.product = card.product;
        req.request.data.state = card.status === "00" ? "28" : "00";
        req.request.data.reason = 'AA';
        req.request.data.user = 'ATH03278';
        const message = card.status === "00" ? mjs.successLock: mjs.successUnlock;
        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('CambiaEstadoTarjeta', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(3));
                dispatch(unsetError());
                dispatch(setMessage(message));
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setLimitCard = (identity, token, card, amount) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2009;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.type = card.type;
        req.request.data.product = card.product;
        req.request.data.reason = '?';
        req.request.data.locationProcedure = 'AA';
        req.request.data.locationRetirement = 'AA';
        req.request.data.user = 'TES03262';
        req.request.data.amount = parseInt(amount.replace("$","").replace(" ","").replace(",",""));

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('CambiaLimiteTarjetaCredito', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(3));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const getCardInfo = (identity, token, card, queryType) => {
    return async( dispatch ) => {
        
        let { generic : req } = requests;
        req.request.header.transaction = 2012;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.type = queryType;
        req.request.data.product = card.product;
        req.request.data.user = 'ATH03278';
        req.request.data.version = '1.0';

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('ConsultaSaldoTarjeta', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;
            if (status.code === '0000') {
                dispatch(getInfo({...data, query:queryType }));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setUserInfo = (identity, token, userInfo) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2011;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.addressHouse = userInfo.address;
        req.request.data.addressWork = userInfo.workAddress;
        req.request.data.phoneMobile = userInfo.mobile;
        req.request.data.phoneHouse = userInfo.telephone;
        req.request.data.phoneWork = userInfo.workTelephone;
        req.request.data.emailEC = userInfo.email;

        req.request.data.maritalStatus = userInfo.maritalStatus;
        req.request.data.state = userInfo.countryState;
        req.request.data.city = userInfo.city;
        req.request.data.addressEC = userInfo.shippingAddress;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('ActualizaDatosClienteSysCard', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;
            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(3));
                dispatch(unsetError());
            } else {
                const mjs = (!status.message || status.message === '') ? 'Error en el servicio' : status.message 
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setPin = (identity, token, card, pin) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2010;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.id = identity;
        req.request.data.type = card.type;
        req.request.data.product = card.product;
        req.request.data.reason = 'AA';
        req.request.data.user = 'ATH03278';
        req.request.data.pin = pin;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('CambiaPINTarjeta', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(3));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const getStatesCountry = () => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 3001;
        req.request.header.step = 0;
        
        req.request.data.id = "LSDEP";
        req.request.data.value = "?";

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('ListasVarias', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;
            const { value } = data;

            if (status.code === '0000') {
                dispatch(setStates(value.valueItems));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const getCities = codeCity => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 3001;
        req.request.header.step = 0;
        
        req.request.data.id = codeCity;
        req.request.data.value = "?";

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('ListasVarias', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;
            const { value } = data;

            if (status.code === '0000') {
                dispatch(setCities(value.valueItems));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            console.log('catch error: ', err);
            dispatch(setLoading());
            dispatch(setError(err + ''));
        }
    }
}

export const setAchAccount = account => ({
    type: types.setAccount,
    payload: account
})

export const getInfo = ( info ) => ({
    type: types.getUserInfo,
    payload: info
})

export const getAgree = detail => ({
    type: types.getAgreement,
    payload: detail
})

const setCities = cities => ({
    type: types.setCityList,
    payload: cities
})

const setStates = states => ({
    type: types.setStateCountryList,
    payload: states
})