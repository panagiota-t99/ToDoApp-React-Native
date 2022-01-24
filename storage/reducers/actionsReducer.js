import {DRAWER_ITEM, ERROR_HANDLER, LOADING_CHANGE} from '../constants';

const initialState = {
  loading: false,
  errorHandler: {visible: false, message: ''},
  drawerItem: 'Home',
};

const actionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CHANGE: {
      return {...state, loading: action.payload};
    }
    case ERROR_HANDLER: {
      return {...state, errorHandler: action.payload};
    }
    case DRAWER_ITEM: {
      return {...state, drawerItem: action.payload};
    }
    default:
      return state;
  }
};

export default actionsReducer;
