import { unsecurefetch, secureFetch } from '../helpers/fetch';
import { types } from '../constants/types';
import { requests } from '../constants/requests';
import { updateStep, setError, unsetError, setLoading, activeModal } from './ui';
import { getTrxBackend } from '../helpers/util';

export const LoginCustomer = user => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = 2005
        req.request.header.step = 1;
        
        req.request.data.type = 'U';
        req.request.data.id = '?';
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
                dispatch(updateStep(1));
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
