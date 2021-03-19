import { unsecurefetch, secureFetch } from '../helpers/fetch';
import { types } from '../constants/types';
import { requests } from '../constants/requests';
import { updateStep, setError, unsetError, setLoading, activeModal } from './ui';
import { getTrxBackend } from '../helpers/util';

export const preLogin = (identity) => {
    return async (dispatch) => {

        let { verifyCustomer: req } = requests;
        req.request.data.id = identity;
        req.request.header.transaction = 1001;
        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('VerifyCustomer', req, 'POST');
            const body = await resp.json();
            const { response: { status, data: { customerCore, customerOCB, customerCoreEmail } } } = body;

            dispatch(verify({
                identity: identity,
                isInCore: customerCore === '1',
                isInOcb: customerOCB === '1',
                customerCoreEmail
            }));

            if (status.code === '0000') {
                //dispatch(updateStep(1));
                dispatch(unsetError());
                // localStorage.setItem('token', body.token );
                // localStorage.setItem('token-init-date', new Date().getTime() );
                if (customerOCB === '1') {
                    dispatch(updateStep(1));
                } else {
                    dispatch(activeModal(true));
                }
            } else {
                if (status.code !== '2001') {
                    dispatch(setError(status.message)); 
                }else{
                    dispatch(activeModal(true));
                }
                
            }
            dispatch(setLoading());
        } catch (err) {
            console.log(err);
            dispatch(setError('Error inesperado, disculpas por las molestias ocasionadas...'));
            dispatch(setLoading());
        }
    }
}

export const preLoginCustomer = (identity, isResetPassWord) => {
    return async (dispatch) => {

        let { verifyCustomer: req } = requests;
        req.request.data.id = identity;
        // req.request.header.transaction = isResetPassWord ? 1003 : 1001;
        req.request.header.transaction = 1001;
        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('VerifyCustomer', req, 'POST');
            const body = await resp.json();
            const { response: { status, data: { customerCore, customerOCB, customerCoreEmail } } } = body;

            dispatch(verify({
                identity: identity,
                isInCore: customerCore === '1',
                isInOcb: customerOCB === '1',
                customerCoreEmail
            }));

            if (status.code === '0000') {
                //dispatch(updateStep(1));
                dispatch(unsetError());
                // localStorage.setItem('token', body.token );
                // localStorage.setItem('token-init-date', new Date().getTime() );
                if (customerOCB === '1') {
                    dispatch(updateStep(1));
                } else {
                    dispatch(activeModal(true));
                }
            } else {
                if (status.code !== '2001') {
                    dispatch(setError(status.message)); 
                }else{
                    dispatch(activeModal(true));
                }
                
            }
            dispatch(setLoading());
        } catch (err) {
            console.log(err);
            dispatch(setError('Error inesperado, disculpas por las molestias ocasionadass'));
            dispatch(setLoading());
        }
    }
}

export const LoginCustomer = user => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2004
        req.request.header.step = 2;
        
        req.request.data.id = user.identity;
        req.request.data.user = user.username;
        req.request.data.otp = user.token;

        dispatch(setLoading());

        try {
            const resp = await unsecurefetch('VerifyCustomer', req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { token } = status;
                dispatch(getInfo({...data, token}));
                dispatch(updateStep(2));
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

const getInfo = ( info ) => ({
    type: types.getUserInfo,
    payload: info
});



const verify = (identity) => ({
    type: types.verify,
    payload: identity
});