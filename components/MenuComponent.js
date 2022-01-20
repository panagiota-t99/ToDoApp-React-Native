import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeComponent from './HomeComponent';
import UserLogsComponent from './UserLogsComponent';
import Logout from './LogoutComponent';
import ListItemsComponent from './ListItemsComponent';

const Drawer = createDrawerNavigator();

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
        component={HomeComponent}
        options={{drawerLabel: 'Home'}}
      />
      <Drawer.Screen
        name="UserLogs"
        component={UserLogsComponent}
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

export default function MenuComponent() {
  return <MyDrawer />;
}
