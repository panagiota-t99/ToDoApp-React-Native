import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import LoginComponent from './components/LoginComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuComponent from './components/MenuComponent';

import LogoutComponent from './components/LogoutComponent';
import {createStackNavigator} from '@react-navigation/stack';
import ListItemsComponent from './components/ListItemsComponent';

const App = ({navigation}) => {
  const [token, setToken] = useState('');
  var isLoggedIn = false;

  useEffect(() => {
    getToken().then(() => {
      console.log('app.js', token);
      console.log('logged in ', isLoggedIn);
    });
  });

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        isLoggedIn = true;
        setToken(value);
        //navigation.navigate('Menu');
      }
    } catch (e) {
      alert(e);
    }
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Menu" component={MenuComponent} />
        <Stack.Screen name="Logout" component={LogoutComponent} />
        <Stack.Screen name="Items" component={ListItemsComponent} />
      </Stack.Navigator>
    </NavigationContainer>
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
