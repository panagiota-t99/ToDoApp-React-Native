import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeComponent from './HomeComponent';
import LogsComponent from './LogsComponent';
import Logout from './LogoutComponent';
import UsersComponent from './UsersComponent';
import {createStackNavigator} from '@react-navigation/stack';
import EditUserComponent from './EditUserComponent';
import SingleUserComponent from './SingleUserComponent';
import ListItemsComponent from './ListItemsComponent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function UserNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Users" component={UsersComponent} />
      <Stack.Screen name="EditUser" component={EditUserComponent} />
      <Stack.Screen name="SingleUser" component={SingleUserComponent} />
    </Stack.Navigator>
  );
}

export function ListAndItemNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Lists" component={HomeComponent} />
      <Stack.Screen name="Items" component={ListItemsComponent} />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveBackgroundColor: '#daddf1',
        drawerActiveTintColor: '#3F51B5',
      }}>
      <Drawer.Screen
        name="Home"
        component={ListAndItemNavigator}
        options={{drawerLabel: 'Home', unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="UserNavigator"
        component={UserNavigator}
        options={{
          drawerLabel: 'Users',
          title: 'Users',
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="UserLogs"
        component={LogsComponent}
        options={{drawerLabel: 'Logs', title: 'Logs', unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{unmountOnBlur: true, headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default function AdminMenuComponent() {
  return <MyDrawer />;
}
