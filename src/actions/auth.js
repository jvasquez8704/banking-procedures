import { unsecurefetch, secureFetch } from '../helpers/fetch';
import { types } from '../constants/types';
import { requests } from '../constants/requests';
import { updateStep, setError, unsetError, setLoading, activeModal } from './ui';

export const verifyCustomer = (identity, isResetPassWord) => {
    return async (dispatch) => {

        let { verifyCustomer: req } = requests;
        req.request.data.id = identity;
        req.request.header.transaction = isResetPassWord ? 1003 : 1001;
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

export const startLogin = (identity, username, token) => {
    return async (dispatch) => {
        
        let { unlockUser: req } = requests;
        req.request.data.id = identity;
        req.request.data.user = username;
        req.request.data.otp = token;

        dispatch(setLoading());
        try {
            const resp = await unsecurefetch('UnlockOCB', req, 'POST');
            const body = await resp.json();
            const { response: { status } } = body;

            if (status.code === '0000') {
                dispatch(updateStep(2));
                dispatch(unsetError());
            } else {
                dispatch(setError(status.message));
            }
            dispatch(setLoading());
        } catch (err) {
            dispatch(setError(err + ''));
            dispatch(setLoading());
        }
    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {

        const resp = await unsecurefetch('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            alert('Error', ' startRegister');

        }


    }
}

export const startChecking = () => {
    return async (dispatch) => {

        const resp = await secureFetch('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish());
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(logout());
    }
}


const login = (user) => ({
    type: types.login,
    payload: user
});

const verify = (identity) => ({
    type: types.verify,
    payload: identity
});

const logout = () => ({ type: types.logout });

const checkingFinish = () => ({ type: types.authCheckingFinish });