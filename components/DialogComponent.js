import React, {Component} from 'react';
import {View, StyleSheet, Image, Pressable, Text} from 'react-native';
import Dialog from 'react-native-dialog';
import {
  addReminder,
  deleteListItem,
  deleteReminder,
  deleteUserList,
  updateListItem,
  updateUserList,
} from '../services/userService';
import {formatPartialDate, getCurrentDate} from '../services/dateService';
import DatePicker from 'react-native-date-picker';
import {Chip} from 'react-native-paper';

class DialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleUpdate: false,
      visibleDelete: false,
      visibleRemind: false,
      visibleDeleteRemind: false,
      name: '',
      date: new Date(),
    };
  }
  showDialog = mode => {
    if (mode === 1) {
      this.setState({visibleUpdate: true});
    } else if (mode === 2) {
      this.setState({visibleDelete: true});
    } else if (mode === 3) {
      this.setState({visibleRemind: true});
    } else {
      this.setState({visibleDeleteRemind: true});
    }
  };

  handleCancel = mode => {
    if (mode === 1) {
      this.setState({visibleUpdate: false});
    } else if (mode === 2) {
      this.setState({visibleDelete: false});
    } else if (mode === 3) {
      this.setState({visibleRemind: false});
    } else {
      this.setState({visibleDeleteRemind: false});
    }
  };

  handleUpdate = async () => {
    this.setState({visibleUpdate: false});

    if (this.state.name) {
      try {
        let res;
        if (this.props.mode === 'list') {
          res = await updateUserList(
            this.props.id,
            this.state.name,
            getCurrentDate(),
          );
        } else {
          res = await updateListItem(
            this.props.id,
            this.state.name,
            getCurrentDate(),
            this.props.listname,
          );
        }
        if (res) {
          this.props.onUpdateSuccess(
            this.props.id,
            this.state.name,
            getCurrentDate(),
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  handleDelete = async () => {
    this.setState({visibleDelete: false});

    try {
      let res;
      if (this.props.mode === 'list') {
        res = await deleteUserList(this.props.id, this.props.listname);
      } else {
        res = await deleteListItem(this.props.id, this.props.itemname);
      }
      if (res) {
        this.props.onDeleteSuccess(this.props.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleReminder = async date => {
    this.setState({visibleRemind: false, date: date});

    let newDate =
      date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString('gr-GR');

    let showDate =
      formatPartialDate(date.toISOString().split('T')[0]) +
      ' at ' +
      date.toLocaleTimeString('gr-GR').split(':')[0] +
      ':' +
      date.toLocaleTimeString('gr-GR').split(':')[1];

    try {
      await addReminder(newDate, this.props.id);
      this.props.onAddReminder(this.props.id, showDate);
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteReminder = async () => {
    this.setState({visibleDeleteRemind: false});

    try {
      await deleteReminder(this.props.id);
      this.props.onDeleteReminder(this.props.id, null);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={this.styles.container}>
        {this.props.mode === 'item' && this.props.reminder != null ? (
          <Chip
            style={{width: 200, backgroundColor: '#daddf1'}}
            icon="bell-outline"
            onClose={() => this.showDialog(4)}>
            {this.props.reminder}
          </Chip>
        ) : (
          <></>
        )}
        <View style={this.styles.iconContainer}>
          {this.props.mode === 'item' && this.props.reminder === null ? (
            <Pressable
              onPress={() => {
                this.showDialog(3);
              }}>
              <Image
                source={require('../assets/bell-outline.png')}
                style={this.styles.icon}
              />
            </Pressable>
          ) : (
            <></>
          )}

          <Pressable
            onPress={() => {
              this.showDialog(1);
            }}>
            <Image
              source={require('../assets/edit.png')}
              style={this.styles.icon}
            />
          </Pressable>

          <Pressable
            onPress={() => {
              this.showDialog(2);
            }}>
            <Image
              source={require('../assets/trash.png')}
              style={this.styles.icon}
            />
          </Pressable>
        </View>

        <Dialog.Container visible={this.state.visibleUpdate}>
          <Dialog.Title>{this.props.title1}</Dialog.Title>
          <Dialog.Description>{this.props.message1}</Dialog.Description>
          <Dialog.Input
            onChangeText={value => {
              this.state.name = value;
            }}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.handleCancel(1);
            }}
          />
          <Dialog.Button label="Update" onPress={this.handleUpdate} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.visibleDelete}>
          <Dialog.Title>{this.props.title2}</Dialog.Title>
          <Dialog.Description>{this.props.message2}</Dialog.Description>
          <Dialog.Button label="Delete" onPress={this.handleDelete} />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.handleCancel(2);
            }}
          />
        </Dialog.Container>

        <DatePicker
          modal
          mode={'datetime'}
          open={this.state.visibleRemind}
          date={this.state.date}
          onConfirm={date => {
            this.handleReminder(date);
          }}
          onCancel={() => {
            this.handleCancel(3);
          }}
        />

        <Dialog.Container visible={this.state.visibleDeleteRemind}>
          <Dialog.Title>Delete Reminder</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this reminder?
          </Dialog.Description>
          <Dialog.Button label="Delete" onPress={this.handleDeleteReminder} />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.handleCancel(4);
            }}
          />
        </Dialog.Container>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {flex: 1, flexDirection: 'column'},
    iconContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    icon: {
      marginRight: 15,
    },
  });
}

export default DialogComponent;
