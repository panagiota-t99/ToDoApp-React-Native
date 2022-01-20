import React, {Component} from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import Dialog from 'react-native-dialog';
import {
  deleteListItem,
  deleteUserList,
  updateListItem,
  updateUserList,
} from '../services/userService';
import {getCurrentDate} from '../services/dateService';

class DialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {visibleUpdate: false, visibleDelete: false, name: ''};
  }
  showDialog = mode => {
    if (mode === 1) {
      this.setState({visibleUpdate: true});
    } else {
      this.setState({visibleDelete: true});
    }
  };

  handleCancel = mode => {
    if (mode === 1) {
      this.setState({visibleUpdate: false});
    } else {
      this.setState({visibleDelete: false});
    }
  };

  handleUpdate = async () => {
    this.setState({visibleUpdate: false});

    if (this.props.mode === 'list') {
      if (this.state.name) {
        try {
          let res = await updateUserList(
            this.props.id,
            this.state.name,
            getCurrentDate(),
          );
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
      } else {
        alert('Please enter a new value!');
      }
    } else {
      if (this.state.name) {
        try {
          let res = await updateListItem(
            this.props.id,
            this.state.name,
            getCurrentDate(),
          );
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
      } else {
        alert('Please enter a new value!');
      }
    }
  };

  handleDelete = async () => {
    this.setState({visibleDelete: false});

    if (this.props.mode === 'list') {
      try {
        let res = await deleteUserList(this.props.id);
        if (res) {
          this.props.onDeleteSuccess(this.props.id);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        let res = await deleteListItem(this.props.id);
        if (res) {
          this.props.onDeleteSuccess(this.props.id);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    return (
      <View style={this.styles.iconContainer}>
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
      </View>
    );
  }

  styles = StyleSheet.create({
    iconContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    icon: {
      marginVertical: 10,
      marginRight: 20,
    },
  });
}

export default DialogComponent;
