import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  formatDate,
  formatPartialDate,
  getCurrentDate,
} from '../services/dateService';
import {getListItems} from '../services/userService';
import DialogComponent from './DialogComponent';
import ItemComponent from './ItemComponent';
import {Chip} from 'react-native-paper';
import {ItemsHeaderBar} from './ItemsHeaderBar';

class ListItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      currentListId: this.props.listid,
      currentListName: this.props.listname,
    };
  }

  async componentDidMount() {
    try {
      await this.getItems();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({isLoading: false});
    }
  }

  async getItems() {
    try {
      const response = await getListItems(this.state.currentListId);
      this.setState({data: formatDate(response)});
    } catch (e) {
      throw e;
    }
  }

  onUpdateSuccess = (itemId, newName, dateModified) => {
    const items = this.state.data;
    const currentItemIndex = items.findIndex(item => item.itemsid === itemId);

    items[currentItemIndex].itemname = newName;
    items[currentItemIndex].dateModified = formatPartialDate(dateModified);

    this.setState({data: items});
  };

  onDeleteSuccess = itemId => {
    this.setState({
      data: this.state.data.filter(item => item.itemsid !== itemId),
    });
  };

  onAddItem = (newItem, insertId) => {
    const items = this.state.data;
    items.push({
      dateCreated: formatPartialDate(getCurrentDate()),
      dateModified: '-',
      itemname: newItem,
      itemsid: insertId,
      reminder: null,
    });
    this.setState({data: items});
  };

  onSetReminder = (itemId, reminder) => {
    const items = this.state.data;
    const currentItemIndex = items.findIndex(item => item.itemsid === itemId);

    items[currentItemIndex].reminder = reminder;

    this.setState({data: items});
  };

  render() {
    const data = this.state.data;
    const isLoading = this.state.isLoading;

    return (
      <View style={this.styles.background}>
        <ItemsHeaderBar
          title={this.state.currentListName}
          hasAdd={true}
          listId={this.state.currentListId}
          onAddSuccess={this.onAddItem}
        />
        <View style={this.styles.container}>
          {isLoading ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={{marginTop: 50}}
            />
          ) : data.length === 0 ? (
            <View>
              <Text
                style={{
                  paddingHorizontal: 17,
                  paddingVertical: 10,
                }}>
                There are currently no items in this list.
              </Text>
              <Image
                source={require('../assets/empty_items.png')}
                style={{
                  resizeMode: 'contain',
                  height: 250,
                  alignSelf: 'center',
                }}
              />
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={({itemsid}) => itemsid}
              renderItem={({item}) => (
                <View style={this.styles.listContainer}>
                  <ItemComponent
                    name={item.itemname}
                    dateCreated={item.dateCreated}
                    dateModified={item.dateModified}
                  />
                  <View>
                    <DialogComponent
                      onUpdateSuccess={this.onUpdateSuccess}
                      onDeleteSuccess={this.onDeleteSuccess}
                      onAddReminder={this.onSetReminder}
                      onDeleteReminder={this.onSetReminder}
                      title1={'Update Item Name'}
                      title2={'Delete Item: ' + item.itemname}
                      message1={'Enter the new item name.'}
                      message2="Are you sure you want to delete this item? You cannot undo this action."
                      id={item.itemsid}
                      itemname={item.itemname}
                      listname={this.state.currentListName}
                      reminder={item.reminder}
                      mode="item"
                    />
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    background: {flex: 1, flexDirection: 'column'},
    container: {
      flex: 1,
      flexDirection: 'column',
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
    header: {
      paddingLeft: 10,
      paddingVertical: 10,
      fontSize: 16,
      color: 'black',
      borderBottomWidth: 1,
      borderBottomColor: '#daddf1',
    },
  });
}

export default ListItemsComponent;
