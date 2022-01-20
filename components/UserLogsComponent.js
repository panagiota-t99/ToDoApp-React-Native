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

class UserLogsComponent extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const roleId = await AsyncStorage.getItem('role');
      if (roleId !== null) {
        try {
          const logs = await getLogs();
          this.setState({data: formatDateLogs(logs)});
          console.log(logs);
        } catch (e) {
          console.log(e);
        } finally {
          this.setState({isLoading: false});
        }
      }
    } catch (e) {
      alert(e);
    }
  }

  render() {
    const data = this.state.data;
    const isLoading = this.state.isLoading;

    return (
      <View style={this.styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({logid}) => logid}
            renderItem={({item}) => (
              <View style={this.styles.listContainer}>
                <Text style={this.styles.message}>Message: {item.message}</Text>
                <Text>Id: {item.logid}</Text>
                <Text>Action: {item.action}</Text>
                <Text>Date Created: {item.dateCreated}</Text>
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
    message: {
      fontSize: 16,
      color: '#3F51B5',
    },
  });
}

export default UserLogsComponent;
