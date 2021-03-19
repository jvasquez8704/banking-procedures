import { unsecurefetch } from '../helpers/fetch';
import { types } from '../constants/types';
import { getEndPoint } from '../helpers/util';
import { requests } from '../constants/requests';
import { setError, unsetError, setLoading, activeDownload } from './ui';

export const getAgreement = ( token, account, user, year, month , type ) => {
    return async( dispatch ) => {
        
        let { unlockUser : req } = requests;
        req.request.header.transaction = type;
        req.request.header.step = 3;
        req.request.header.token = token;
        
        req.request.data.account = account;
        req.request.data.user = user;
        req.request.data.year = year;
        req.request.data.month = month;

        dispatch(setLoading());
      
        try {
            const resp = await unsecurefetch(getEndPoint(type), req, 'POST');
            const body = await resp.json();
            const { response: { status, data } } = body;

            if (status.code === '0000') {
                const { url } = data;
                dispatch(activeDownload(true));
                dispatch(setUrlChecks(url));
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
});

const setUrlChecks = url => ({
    type: types.setUrlChecks,
    payload: url
});