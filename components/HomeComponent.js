import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {getUserLists} from '../services/userService';
import DialogComponent from './DialogComponent';
import AddComponent from './AddComponent';
import {
  formatDate,
  formatPartialDate,
  getCurrentDate,
} from '../services/dateService';

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      newList: '',
    };
  }

  async componentDidMount() {
    try {
      await this.getLists();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({isLoading: false});
    }
  }

  async getLists() {
    try {
      const response = await getUserLists();
      this.setState({data: formatDate(response)});
    } catch (e) {
      throw e;
    }
  }

  getSelectedList(id, name) {
    this.props.navigation.navigate('Items', {listId: id, listName: name});
  }

  onUpdateSuccess = (listId, newName, dateModified) => {
    const lists = this.state.data;
    const currentListIndex = lists.findIndex(list => list.listid === listId);

    lists[currentListIndex].listname = newName;
    lists[currentListIndex].dateModified = formatPartialDate(dateModified);

    this.setState({data: lists});

    /* if an object is returned
    const lists = this.state.data;
    const currentListIndex = lists.findIndex(
      list => list.listid === newList.listid);

    lists[currentListIndex] = newList;
    this.setState({data: lists});
     */
  };

  onDeleteSuccess = listId => {
    this.setState({
      data: this.state.data.filter(list => list.listid !== listId),
    });

    /* 1 option: refresh the lists with a request
    try {
      this.setState({isLoading: true});
      await this.getLists();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({isLoading: false});
    }
    */

    /* 2 option: remove the deleted list from view by index
     const lists = this.state.data;
     const currentListIndex = lists.findIndex(
      list => list.listid === listId,
    );
    if (currentListIndex > -1){
      lists.splice(0, currentListIndex);
      this.setState({data: lists});
    }
    */

    /* 3 option: remove the deleted list from view by filtering the id
    const lists = this.state.data.filter(list => list.listid !== listId);
    this.setState({data: lists});
     */
  };

  onAddList = (newList, insertId) => {
    const lists = this.state.data;
    lists.push({
      dateCreated: formatPartialDate(getCurrentDate()),
      dateModified: null,
      listname: newList,
      listid: insertId,
    });
    this.setState({data: lists});
  };

  render() {
    const data = this.state.data;
    const isLoading = this.state.isLoading;

    return (
      <View style={this.styles.background}>
        <View style={this.styles.container}>
          <AddComponent
            onAdd={this.onAddList}
            placeholder="Create a new list"
            mode="list"
          />
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({listid}) => listid}
              renderItem={({item}) => (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#b4bbe4"
                  onPress={() => {
                    this.getSelectedList(item.listid, item.listname);
                  }}>
                  <View style={this.styles.listContainer}>
                    <Text>Id: {item.listid}</Text>
                    <Text>List: {item.listname}</Text>
                    <Text>Date Created: {item.dateCreated}</Text>
                    <Text>Date Modified: {item.dateModified}</Text>
                    <View>
                      <DialogComponent
                        onUpdateSuccess={this.onUpdateSuccess}
                        onDeleteSuccess={this.onDeleteSuccess}
                        title1={'Update List Name'}
                        title2={'Delete List: ' + item.listname}
                        message1={'Enter the new list name.'}
                        message2="Are you sure you want to delete this list? You cannot undo this action."
                        id={item.listid}
                        mode="list"
                      />
                    </View>
                  </View>
                </TouchableHighlight>
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
      backgroundColor: 'white',
      flex: 1,
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

export default HomeComponent;
