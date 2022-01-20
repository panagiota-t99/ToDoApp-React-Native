import React from 'react';
import {useDispatch} from 'react-redux';
import {errorHandling} from '../storage/actions/actions';

// const dispatch = useDispatch();
//
// export function showError(visible, message) {
//   dispatch(errorHandling({visible: visible, message: message}));
// }

const ReduxService = () => {
  const dispatch = useDispatch();

  function showError(visible, message) {
    dispatch(errorHandling({visible: visible, message: message}));
  }

  return <></>;
};
export default ReduxService;
