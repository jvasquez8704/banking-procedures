import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import { serviceReducer } from '../reducers/servicesReducer';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { userReducer } from '../reducers/userReducer';



const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    ach: serviceReducer,
    user: userReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);