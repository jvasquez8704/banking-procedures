import { types } from '../constants/types';

export const achReducer = (state = {}, action) => {
    switch (action.type) {

        case types.getUserInfo:
            return {
                ...action.payload
            }
        case types.getAgreement:
            return {
                ...state,
                agreement: action.payload
            }
        case types.setAccount:
            return {
                ...state,
                selectedAccount: action.payload
            }
        case types.getEnrolment:
            return {
                ...state,
                aproved: action.payload
            }
        default:
            return state;
    }

}