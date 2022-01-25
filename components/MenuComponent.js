import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeComponent from './HomeComponent';
import LogsComponent from './LogsComponent';
import {Alert, Text, View} from 'react-native';
import ListItemsComponent from './ListItemsComponent';
import {useNavigation} from '@react-navigation/native';
import EditUserComponent from './EditUserComponent';
import SingleUserComponent from './SingleUserComponent';
import UsersComponent from './UsersComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDrawerItem} from '../storage/actions/actions';
import {getUsername} from '../services/userService';
import {Avatar} from 'react-native-paper';

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const role = props.role;
  const [currentlySelected, setCurrentlySelected] = useState();
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    setCurrentlySelected(state.actions.drawerItem);
    getUser();
  }, [state.actions.drawerItem]);

  async function getUser() {
    try {
      const res = await getUsername();
      if (res) {
        setUsername(res[0].userName);
      }
    } catch (e) {
      alert(e);
    }
  }
  function navigate(route) {
    dispatch(setDrawerItem(route));
    setCurrentlySelected(route);
    navigation.navigate(route);
  }

  function logout() {
    Alert.alert('Logging out...', 'Are you sure you want to log out?', [
      {
        text: 'Yes',
        onPress: () => {
          clearStorage().then(() => {
            navigation.replace('Login');
          });
        },
      },
      {
        text: 'Cancel',
        onPress: () => props.navigation.toggleDrawer(),
      },
    ]);
  }

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
    } catch (e) {
      console.log(e);
    }
    console.log('clear storage done.');
  };

  const isFocused = drawerItem => {
    return drawerItem === currentlySelected;
  };

  return role == 1 ? (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar.Icon
          size={48}
          icon="account-circle-outline"
          color={'#3F51B5'}
          style={{backgroundColor: 'transparent'}}
        />
        <Text>{username}</Text>
      </View>
      <DrawerItem
        label={'Home'}
        focused={isFocused('Home')}
        activeBackgroundColor={'#daddf1'}
        activeTintColor={'#3F51B5'}
        onPress={() => navigate('Home')}
      />
      <DrawerItem
        label={'Logs'}
        focused={isFocused('Logs')}
        activeBackgroundColor={'#daddf1'}
        activeTintColor={'#3F51B5'}
        onPress={() => navigate('Logs')}
      />
      <DrawerItem
        label={'Users'}
        focused={isFocused('Users')}
        activeBackgroundColor={'#daddf1'}
        activeTintColor={'#3F51B5'}
        onPress={() => navigate('Users')}
      />
      <DrawerItem
        label={'Logout'}
        focused={isFocused('Logout')}
        activeBackgroundColor={'#daddf1'}
        activeTintColor={'#3F51B5'}
        onPress={() => logout()}
      />
    </DrawerContentScrollView>
  ) : (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Home'}
        focused={isFocused('Home')}
        activeBackgroundColor={'#daddf1'}
        activeTintColor={'#3F51B5'}
        onPress={() => navigate('Home')}
      />
      <DrawerItem
        label={'Logs'}
        focused={isFocused('Logs')}
        activeBackgroundColor={'#daddf1'}
        activeTintColor={'#3F51B5'}
        onPress={() => navigate('Logs')}
      />
      <DrawerItem
        label={'Logout'}
        focused={isFocused('Logout')}
        activeBackgroundColor={'#daddf1'}
        activeTintColor={'#3F51B5'}
        onPress={() => logout()}
      />
    </DrawerContentScrollView>
  );
}

const MenuComponent = props => {
  const Drawer = createDrawerNavigator();
  const role = props.route.params.role;

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} role={role} />}>
      <Drawer.Screen
        name="Home"
        options={{headerShown: false, headerTransparent: true}}
        component={HomeComponent}
      />
      <Drawer.Screen
        name="Items"
        options={{headerShown: false, headerTransparent: true}}
        component={ListItemsComponent}
      />
      <Drawer.Screen
        name="Logs"
        options={{headerShown: false, headerTransparent: true}}
        component={LogsComponent}
      />
      <Drawer.Screen
        name="Users"
        options={{headerShown: false, headerTransparent: true}}
        component={UsersComponent}
      />
      <Drawer.Screen
        name="EditUser"
        options={{headerShown: false, headerTransparent: true}}
        component={EditUserComponent}
      />
      <Drawer.Screen
        name="SingleUser"
        options={{headerShown: false, headerTransparent: true}}
        component={SingleUserComponent}
      />
    </Drawer.Navigator>
  );
};

export default MenuComponent;
