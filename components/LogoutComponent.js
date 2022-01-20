import {Alert} from 'react-native';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation}) => {
  useEffect(() => {
    Alert.alert('Logging out...', 'Are you sure you want to log out?', [
      {
        text: 'Yes',
        onPress: () => {
          clearStorage().then(r => {
            console.log('Yes Pressed');
            navigation.replace('Login');
          });
        },
      },
      {
        text: 'Cancel',
        onPress: () => navigation.navigate('Home'),
        style: 'cancel',
      },
    ]);
  });

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
    } catch (e) {
      console.log(e);
    }
    console.log('clear storage done.');
  };

  return null;
};

export default Logout;
