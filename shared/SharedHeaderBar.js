import {Text, StyleSheet, Button, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Dialog, Paragraph, Portal} from 'react-native-paper';
import {addUserList} from '../services/userService';

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

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Create a new list</Dialog.Title>
          <Dialog.Content>
            <TextInput
              placeholder={'Start typing'}
              onChangeText={value => setNewElement(value)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Pressable
              onPress={() => {
                hideDialog();
              }}>
              <Text style={styles.btn}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onAdd().then(r => setVisible(false));
              }}>
              <Text style={styles.btn}>Add</Text>
            </Pressable>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  },
  btn: {
    backgroundColor: '#3F51B5',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
