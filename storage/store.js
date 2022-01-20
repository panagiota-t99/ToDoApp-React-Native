import {combineReducers, createStore} from 'redux';
import actionsReducer from './reducers/actionsReducer';

const rootReducer = combineReducers({actions: actionsReducer});
const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
