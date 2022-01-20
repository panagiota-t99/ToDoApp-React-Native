import * as React from 'react';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';
import {useState} from 'react';
import {addItemToList, addUserList} from '../services/userService';

const AddComponent = props => {
  const [newAdd, setNewAdd] = useState('');

  async function onAdd() {
    if (newAdd) {
      if (props.mode === 'list') {
        try {
          let res = await addUserList(newAdd);
          if (res) {
            props.onAdd(newAdd, res.insertId);
            setNewAdd('');
            alert('List added');
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          let res = await addItemToList(props.listId, props.listName, newAdd);
          if (res) {
            props.onAdd(newAdd, res.insertId);
            setNewAdd('');
            alert('Item added');
          }
        } catch (e) {}
      }
    } else {
      alert('Please fill in the field.');
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
