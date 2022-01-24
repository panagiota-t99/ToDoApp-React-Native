import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
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
          <ActivityIndicator />
        ) : data.length === 0 ? (
          <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
            There are currently no logs.
          </Text>
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
      backgroundColor: 'white',
      flex: 2,
      flexDirection: 'column',
    },
    listContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomColor: '#daddf1',
      borderBottomWidth: 1,
    },
  });
}

export default LogsComponent;
