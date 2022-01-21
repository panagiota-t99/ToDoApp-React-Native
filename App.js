import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginComponent from './components/LoginComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserMenuComponent from './components/UserMenuComponent';

import LogoutComponent from './components/LogoutComponent';
import {createStackNavigator} from '@react-navigation/stack';
import ListItemsComponent from './components/ListItemsComponent';
import {Provider as StoreProvider} from 'react-redux';
import configureStore from './storage/store';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import Loading from './helpers/Loading';
import GlobalErrorHandler from './helpers/GlobalErrorHandler';
import AdminMenuComponent from './components/AdminMenuComponent';
import RegisterComponent from './components/RegisterComponent';

const store = configureStore();

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken().then(() => {
      console.log('app.js', token);
    });
  });

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
        //navigation.navigate('Menu');
      }
    } catch (e) {
      alert(e);
    }
  };

  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <Loading />
        <GlobalErrorHandler />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginComponent} />
            <Stack.Screen name="Register" component={RegisterComponent} />
            <Stack.Screen name="UserMenu" component={UserMenuComponent} />
            <Stack.Screen name="AdminMenu" component={AdminMenuComponent} />
            <Stack.Screen name="Logout" component={LogoutComponent} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;

// {token === null ? (
//   <Stack.Screen
//     name="ToDoApp"
//     component={LoginComponent}
//     options={{headerShown: false}}
//   />
// ) : (
//   <Stack.Screen
//     name="Home"
//     component={HomeComponent}
//     options={{headerBackVisible: false}}
//   />
// )}
