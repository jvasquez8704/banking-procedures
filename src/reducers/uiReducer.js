import { types } from '../constants/types';

const initialState = {
    tab: 1,
    step: 0,
    loading: false,
    err: null,
    openModal: false,
    mjs:''
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.updateStep:
            return {
                ...state,
                step: action.payload
            }
        case types.setError:
            return {
                ...state,
                err: action.payload
            }
        case types.unsetError:
            return {
                ...state,
                err: null
            }
        case types.setLoading:
            return {
                ...state,
                loading: !state.loading
            }
        case types.setTab:
            return {
                ...state,
                tab: action.payload
            }
        case types.setModal:
            return {
                ...state,
                openModal: action.payload
            } 
        case types.setMjs:
            return {
                ...state,
                mjs: action.payload
            }
        case types.activeDowload:
            return {
                ...state,
                download: action.payload
            }
        default:
            return state;
    }
}