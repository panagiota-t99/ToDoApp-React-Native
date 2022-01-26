import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginComponent from './components/LoginComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import configureStore from './storage/store';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import Loading from './helpers/Loading';
import GlobalErrorHandler from './helpers/GlobalErrorHandler';
import RegisterComponent from './components/RegisterComponent';
import MenuComponent from './components/MenuComponent';

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
      }
    } catch (e) {
      alert(e);
    }
  };

  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <PaperProvider>
          <Loading />
          <GlobalErrorHandler />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen
                store={store}
                name="Login"
                component={LoginComponent}
              />
              <Stack.Screen name="Register" component={RegisterComponent} />
              <Stack.Screen name="Menu" component={MenuComponent} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
