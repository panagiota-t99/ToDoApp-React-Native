import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
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

// const mapStateToProps = state => ({});
//
// const mapDispatchToProps = () => {};

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
      dateModified: '-',
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
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <ActivityIndicator
                color="#6877ca"
                size="large"
                style={{marginTop: 50}}
              />
            </View>
          ) : data.length === 0 ? (
            <ImageBackground
              source={require('../assets/empty.png')}
              style={this.styles.image}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6877ca',
                  alignSelf: 'center',
                  marginTop: 400,
                }}>
                There are currently no lists
              </Text>
            </ImageBackground>
          ) : (
            <FlatList
              data={data}
              keyExtractor={({listid}) => listid}
              renderItem={({item}) => (
                <TouchableHighlight
                  style={this.styles.listContainer}
                  activeOpacity={0.6}
                  underlayColor="#b4bbe4"
                  onPress={() => {
                    this.setState({
                      selectedListId: item.listid,
                      selectedListName: item.listname,
                    });
                    this.RBSheet.open();
                  }}>
                  <View>
                    <ItemComponent
                      id={item.listid}
                      name={item.listname}
                      dateCreated={item.dateCreated}
                      dateModified={item.dateModified}
                    />
                    <DialogComponent
                      onUpdateSuccess={this.onUpdateSuccess}
                      onDeleteSuccess={this.onDeleteSuccess}
                      title1={'Update List Name'}
                      title2={'Delete List: ' + item.listname}
                      message1={'Enter the new list name.'}
                      message2="Are you sure you want to delete this list? You cannot undo this action."
                      id={item.listid}
                      listname={item.listname}
                      mode="list"
                    />
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
            animationType={'slide'}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderColor: '#384394',
                borderTopWidth: 2,
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
              draggableIcon: {
                width: 40,
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
    background: {flex: 1, flexDirection: 'column'},
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#6877ca',
    },
    listContainer: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: '#4255bd',
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

export default HomeComponent;
