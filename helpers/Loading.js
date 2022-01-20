import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Modal, View, StyleSheet} from 'react-native';

const Loading = () => {
  const state = useSelector(state => state);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={state.actions.loading}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <ActivityIndicator
            animating={state.actions.loading}
            color="#003087"
            size="large"
            style={{height: 80, marginTop: 10, opacity: 1}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  container: {
    backgroundColor: 'transparent',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loading;
