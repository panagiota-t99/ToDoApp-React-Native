import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {getUsers} from '../services/userService';
import SingleUserComponent from './SingleUserComponent';
import {SharedHeaderBar} from '../shared/SharedHeaderBar';

class UsersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }
  async componentDidMount() {
    try {
      await this.getUsers();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({isLoading: false});
    }
  }

  async getUsers() {
    try {
      const response = await getUsers();
      this.setRole(response);
    } catch (e) {
      throw e;
    }
  }

  setRole = users => {
    for (let user of users) {
      if (user.roleid == 1) {
        user.role = 'Admin';
      } else {
        user.role = 'User';
      }
    }
    this.setState({data: users});
  };

  onDeleteSuccess = id => {
    this.setState({
      data: this.state.data.filter(user => user.id !== id),
    });
  };

  render() {
    const data = this.state.data;
    const isLoading = this.state.isLoading;

    return (
      <View style={this.styles.background}>
        <SharedHeaderBar title="Users" hasAdd={false} />
        <View style={this.styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({id}) => id}
              renderItem={({item}) => (
                <View style={this.styles.listContainer}>
                  <SingleUserComponent
                    firstname={item.firstname}
                    lastname={item.lastname}
                    userid={item.id}
                    email={item.email}
                    role={item.role}
                    username={item.username}
                    onDeleteSuccess={this.onDeleteSuccess}
                  />
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    background: {backgroundColor: '#daddf1', flex: 1, flexDirection: 'column'},
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    listContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomColor: '#daddf1',
      borderBottomWidth: 1,
    },
  });
}

export default UsersComponent;
