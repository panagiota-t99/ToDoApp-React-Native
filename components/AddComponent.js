import * as React from 'react';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';
import {useState} from 'react';
import {addItemToList, addUserList} from '../services/userService';
import {useDispatch} from 'react-redux';
import {errorHandling} from '../storage/actions/actions';

const AddComponent = props => {
  const [newAdd, setNewAdd] = useState('');
  const dispatch = useDispatch();

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
    <View style={styles.preHeader}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="#9196d4"
        onChangeText={value => {
          setNewAdd(value);
        }}
        value={newAdd}
      />
      <Pressable style={styles.addBtn} onPress={onAdd}>
        <Image source={require('../assets/add.png')} />
      </Pressable>
    </View>
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
