import {DRAWER_ITEM, ERROR_HANDLER, LOADING_CHANGE} from '../constants';

export const changeLoading = loading => ({
  type: LOADING_CHANGE,
  payload: loading,
});

export const errorHandling = data => ({
  type: ERROR_HANDLER,
  payload: data,
});

export const setDrawerItem = data => ({
  type: DRAWER_ITEM,
  payload: data,
});
