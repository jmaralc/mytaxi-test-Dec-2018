import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import mainAppReducer from './carLists/reducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({ routing: routerReducer, mainAppReducer });

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export default store;
