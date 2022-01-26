import {
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import {DRAWER_ITEM, ERROR_HANDLER, LOADING_CHANGE} from '../storage/constants';

const windowWidth = Dimensions.get('window').width;

export const SharedBackHeaderBar = ({title}) => {
  const navigation = useNavigation();

  const goBack = () => {
    // navigation.goBack();
    navigation.navigate('Users');
  };

  return (
    <Appbar style={styles.bottom}>
      <Appbar.BackAction
        onPress={() => {
          goBack();
        }}
      />
      <Appbar.Content title={title} subtitle={''} />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'white',
  },
});
