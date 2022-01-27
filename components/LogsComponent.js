import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLogs} from '../services/userService';

import {formatDateLogs} from '../services/dateService';
import AdminLogsItem from './AdminLogsItem';
import UserLogsItem from './UserLogsItem';
import {SharedHeaderBar} from '../shared/SharedHeaderBar';

class LogsComponent extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isLoading: true,
      isAdmin: false,
    };
  }

  async componentDidMount() {
    try {
      const roleId = await AsyncStorage.getItem('role');
      if (roleId == '1') {
        this.setState({isAdmin: true});
      }

      const logs = await getLogs(roleId);
      this.setState({data: formatDateLogs(logs)});
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({isLoading: false});
    }
  }

  render() {
    const data = this.state.data;
    const isLoading = this.state.isLoading;
    const isAdmin = this.state.isAdmin;

    return (
      <View style={this.styles.container}>
        <SharedHeaderBar title="Logs" hasAdd={false} />
        {isLoading ? (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <ActivityIndicator
              color="#6877ca"
              size="large"
              style={{marginTop: 50}}
            />
          </View>
        ) : data.length === 0 ? (
          <ImageBackground
            source={require('../assets/logs.png')}
            style={this.styles.image}>
            <Text
              style={{
                fontSize: 16,
                color: '#6877ca',
                alignSelf: 'center',
                marginTop: 450,
              }}>
              There are currently no logs
            </Text>
          </ImageBackground>
        ) : (
          <FlatList
            data={data}
            keyExtractor={({logid}) => logid}
            renderItem={({item}) => (
              <View style={this.styles.listContainer}>
                {isAdmin ? (
                  <AdminLogsItem
                    message={item.message}
                    firstname={item.firstname}
                    lastname={item.lastname}
                    userid={item.userid}
                    logid={item.logid}
                    action={item.action}
                    dateCreated={item.dateCreated}
                  />
                ) : (
                  <UserLogsItem
                    message={item.message}
                    logid={item.logid}
                    action={item.action}
                    dateCreated={item.dateCreated}
                  />
                )}
              </View>
            )}
          />
        )}
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#6877ca',
    },
    listContainer: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: '#9099d5',
      borderBottomWidth: 1,
      marginHorizontal: 20,
      borderWidth: 1,
      borderRadius: 10,
      marginVertical: 10,
      elevation: 10,
    },
    image: {
      flex: 1,
      width: '100%',
    },
  });
}

export default LogsComponent;
