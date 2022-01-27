import {Text, StyleSheet, Button, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Paragraph, Portal} from 'react-native-paper';
import {addUserList} from '../services/userService';
import Dialog from 'react-native-dialog';

// @ts-ignore
export const SharedHeaderBar = props => {
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
        res = await addUserList(newElement);
        if (res) {
          props.onAddSuccess(newElement, res.insertId);
          setNewElement('');
        }
      } catch (e) {}
    } else {
      alert('Please fill in the input.');
    }
  }

  return props.hasAdd ? (
    <Appbar style={styles.appBar}>
      <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
      <Appbar.Content title={props.title} subtitle={''} />
      <Appbar.Action icon="plus" onPress={() => setVisible(true)} />

      <Dialog.Container visible={visible}>
        <Dialog.Title>Create a new list</Dialog.Title>
        <Dialog.Input
          placeholder={'Start typing'}
          onChangeText={value => setNewElement(value)}
        />
        <Dialog.Button
          style={styles.btn}
          label="Cancel"
          onPress={() => {
            hideDialog();
          }}
        />
        <Dialog.Button
          style={styles.btn}
          label="Add"
          onPress={() => {
            hideDialog();
            onAdd();
          }}
        />
      </Dialog.Container>
    </Appbar>
  ) : (
    <Appbar style={styles.appBar}>
      <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
      <Appbar.Content title={props.title} subtitle={''} />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: 'white',
    height: 50,
  },
  btn: {
    //color: '#3F51B5',
  },
});
