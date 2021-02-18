import { types } from '../constants/types';

const initialState = {
    cardTypes : [{ product: '3001', mask: 'Crédito' }, { product: '3002', mask: 'Débito' }],
    queryTypes : [{ product: 'EX', mask: 'Monto Disponible para Extra-Financiamiento' }, { product: 'SL', mask: 'Consulta saldo disponible de límite de crédito' }],
    maritalStatuses : [{ product: 'C', mask: 'Casado' }, { product: 'D', mask: 'Divorciado' }, { product: 'S', mask: 'Soltero' }, { product: 'V', mask: 'Viudo'}, { product:'U', mask: 'Unión Libre'}, { product: 'N' , mask: 'No Aplica'}],
    reasonBlock : [{ product: '3005', mask: 'Bloqueo' }, { product: '3006', mask: 'Desbloqueo' }],
    reasonUpdateLimit : [{ product: '3007', mask: 'Aumento' }, { product: '3008', mask: 'Disminución' }]
}

export const serviceReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.getUserInfo:
            return {
                ...state,
                ...action.payload
            }
        case types.getAgreement:
            return {
                ...state,
                detail: action.payload
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
        case types.setStateCountryList:
            return {
                ...state,
                stateCountryList: action.payload
            }
        case types.setCityList:
            return {
                ...state,
                cityList: action.payload
            }
        default:
            return state;
    }

}