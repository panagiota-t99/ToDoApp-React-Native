import * as React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useState} from 'react';
import {addItemToList, addUserList} from '../services/userService';
import {useDispatch} from 'react-redux';
import {errorHandling} from '../storage/actions/actions';
import {Dialog, Portal} from 'react-native-paper';

const AddComponent = props => {
  const [newAdd, setNewAdd] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const hideDialog = () => setVisible(false);

  async function onAdd() {
    if (newAdd) {
      let res;
      try {
        if (props.mode === 'list') {
          res = await addUserList(newAdd);
        } else {
          res = await addItemToList(props.listId, props.listName, newAdd);
        }
        if (res) {
          props.onAdd(newAdd, res.insertId);
          setNewAdd('');
        }
      } catch (e) {}
    } else {
      dispatch(
        errorHandling({visible: true, message: 'Please fill in the field.'}),
      );
    }
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Create a new list</Dialog.Title>
        <Dialog.Content>
          <TextInput
            placeholder={'Start typing'}
            onChangeText={value => setNewAdd(value)}
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
              onAdd().then(() => setVisible(false));
            }}>
            <Text style={styles.btn}>Add</Text>
          </Pressable>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  preHeader: {
    backgroundColor: '#daddf1',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1,
    paddingBottom: 0,
    width: 150,
    marginBottom: 10,
  },
  addBtn: {paddingLeft: 20},
});

export default AddComponent;
