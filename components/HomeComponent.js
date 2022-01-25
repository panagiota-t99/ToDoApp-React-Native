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
import {
  formatDate,
  formatPartialDate,
  getCurrentDate,
} from '../services/dateService';
import ItemComponent from './ItemComponent';
import {SharedHeaderBar} from '../shared/SharedHeaderBar';
import RBSheet from 'react-native-raw-bottom-sheet';
import ListItemsComponent from './ListItemsComponent';
import {setDrawerItem} from '../storage/actions/actions';

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      newList: '',
      selectedListId: 0,
      selectedListName: '',
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
        <SharedHeaderBar
          title="Home"
          hasAdd={true}
          onAddSuccess={this.onAddList}
        />
        <View style={this.styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : data.length === 0 ? (
            <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
              There are currently no lists.
            </Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={({listid}) => listid}
              renderItem={({item}) => (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#b4bbe4"
                  onPress={() => {
                    this.setState({
                      selectedListId: item.listid,
                      selectedListName: item.listname,
                    });
                    this.RBSheet.open();
                  }}>
                  <View style={this.styles.listContainer}>
                    <ItemComponent
                      id={item.listid}
                      name={item.listname}
                      dateCreated={item.dateCreated}
                      dateModified={item.dateModified}
                    />
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
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            closeOnDragDown={true}
            dragFromTopOnly={true}
            closeOnPressMask={false}
            height={400}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <ListItemsComponent
              listid={this.state.selectedListId}
              listname={this.state.selectedListName}
            />
          </RBSheet>
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

export default HomeComponent;
