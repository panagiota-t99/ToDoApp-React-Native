import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from 'react-native-dialog';
import {errorHandling} from '../storage/actions/actions';

const GlobalErrorHandler = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handle = () => {
    dispatch(errorHandling({visible: false, message: ''}));
  };

  return (
    <>
      <Dialog.Container visible={state.actions.errorHandler.visible}>
        <Dialog.Description>
          {state.actions.errorHandler.message}
        </Dialog.Description>
        <Dialog.Button label="OK" onPress={handle} />
      </Dialog.Container>
    </>
  );
};

export default GlobalErrorHandler;
