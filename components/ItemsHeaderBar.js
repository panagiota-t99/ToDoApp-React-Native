import {Text, StyleSheet, Button, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Paragraph, Portal} from 'react-native-paper';
import {addItemToList, addUserList} from '../services/userService';
import Dialog from 'react-native-dialog';

// @ts-ignore
export const ItemsHeaderBar = props => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [newElement, setNewElement] = useState('');

  const hideDialog = () => setVisible(false);

  const toggleDrawer = () => {
    // @ts-ignore
    navigation.toggleDrawer();
  };

  async function onAdd() {
    if (newElement) {
      let res;
      try {
        res = await addItemToList(props.listId, props.title, newElement);
        if (res) {
          props.onAddSuccess(newElement, res.insertId);
          setNewElement('');
        }
      } catch (e) {}
    } else {
      alert('Please fill in the input.');
    }
  }

  return (
    <Appbar.Header style={styles.appBar}>
      <Appbar.Content
        title={'Items of ' + props.title}
        titleStyle={{fontSize: 18}}
      />
      <Appbar.Action icon="plus" onPress={() => setVisible(true)} />

      <Dialog.Container visible={visible}>
        <Dialog.Title>Create a new item</Dialog.Title>
        <Dialog.Input
          placeholder={'Start typing'}
          onChangeText={value => setNewElement(value)}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            hideDialog();
          }}
        />
        <Dialog.Button
          label="Add"
          onPress={() => {
            hideDialog();
            onAdd();
          }}
        />
      </Dialog.Container>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: 'transparent',
    elevation: 0,
    height: 35,
  },
});
