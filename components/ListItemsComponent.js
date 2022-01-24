import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
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
import AddComponent from './AddComponent';
import DialogComponent from './DialogComponent';
import ItemComponent from './ItemComponent';
import {SharedHeaderBar} from '../shared/SharedHeaderBar';
import {SharedBackHeaderBar} from '../shared/SharedBackHeaderBar';

class ListItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      currentListId: this.props.route.params.listId,
      currentListName: this.props.route.params.listName,
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
      console.log(this.state.data);
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
    console.log(newItem, insertId);
    const items = this.state.data;
    items.push({
      dateCreated: formatPartialDate(getCurrentDate()),
      dateModified: null,
      itemname: newItem,
      itemsid: insertId,
    });
    this.setState({data: items});
  };

  render() {
    const data = this.state.data;
    const isLoading = this.state.isLoading;

    return (
      <View>
        <SharedBackHeaderBar color="white" title="Items" titleColor="black" />
        <View>
          <AddComponent
            onAdd={this.onAddItem}
            placeholder="Create a new item"
            mode="item"
            listId={this.state.currentListId}
            listName={this.state.currentListName}
          />
          <Text style={this.styles.header}>
            Items of list: {this.state.currentListName}
          </Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : data.length === 0 ? (
            <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
              There are currently no items in this list.
            </Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={({itemsid}) => itemsid}
              renderItem={({item}) => (
                <View style={this.styles.listContainer}>
                  <ItemComponent
                    id={item.itemsid}
                    name={item.itemname}
                    dateCreated={item.dateCreated}
                    dateModified={item.dateModified}
                  />
                  <View>
                    <DialogComponent
                      onUpdateSuccess={this.onUpdateSuccess}
                      onDeleteSuccess={this.onDeleteSuccess}
                      title1={'Update Item Name'}
                      title2={'Delete Item: ' + item.itemname}
                      message1={'Enter the new item name.'}
                      message2="Are you sure you want to delete this item? You cannot undo this action."
                      id={item.itemsid}
                      listname={this.state.currentListName}
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
    header: {
      paddingLeft: 10,
      paddingVertical: 10,
      fontSize: 16,
      color: 'black',
      borderBottomWidth: 1,
      borderBottomColor: '#daddf1',

      // height: 50,
    },
  });
}

export default ListItemsComponent;
