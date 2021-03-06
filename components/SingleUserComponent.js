import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {deleteUser} from '../services/userService';
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from 'react-native-paper';

const SingleUserComponent = props => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    check().then(res => {
      if (props.userid == res) {
        setDisabled(true);
      }
    });
  }, [props.userid]);

  const check = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      return id;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async id => {
    try {
      await deleteUser(id);
      setVisible(false);
      props.onDeleteSuccess(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.role === 'Admin' ? (
          <Avatar.Icon
            size={48}
            icon="account-cog-outline"
            color={'#3F51B5'}
            style={{backgroundColor: 'transparent'}}
          />
        ) : (
          <Avatar.Icon
            size={48}
            icon="account-outline"
            color={'#3F51B5'}
            style={{backgroundColor: 'transparent'}}
          />
        )}

        <Text style={styles.userInfo}>
          {props.firstname} {props.lastname}
        </Text>
      </View>

      <Text>Email: {props.email}</Text>
      <Text>Username: {props.username}</Text>

      <View style={styles.iconContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate('EditUser', {
              firstname: props.firstname,
              lastname: props.lastname,
              email: props.email,
              username: props.username,
              role: props.role,
              userid: props.userid,
            })
          }>
          <Image source={require('../assets/edit.png')} style={styles.icon} />
        </Pressable>

        {disabled ? (
          <Image
            source={require('../assets/disabled_trash.png')}
            style={styles.icon}
          />
        ) : (
          <Pressable onPress={() => setVisible(true)}>
            <Image
              source={require('../assets/trash.png')}
              style={styles.icon}
            />
          </Pressable>
        )}

        <Dialog.Container visible={visible}>
          <Dialog.Title>Delete User</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this user?
          </Dialog.Description>
          <Dialog.Button
            label="Delete"
            onPress={() => handleDelete(props.userid)}
          />
          <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
        </Dialog.Container>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    fontSize: 16,
    color: '#7b88d1',
  },
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

export default SingleUserComponent;
