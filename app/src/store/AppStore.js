import {createStore} from 'redux';
import initialState from './initialState.json';
import reducers from './NodeReducer';

export default createStore(reducers, initialState);