import {createStore} from 'redux';
import initialTree from '../initialTree.json';
import reducers from './NodeReducer';

export default createStore(reducers, initialTree);