import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {updateUserDetails} from '../services/userService';
import {SharedBackHeaderBar} from '../shared/SharedBackHeaderBar';

const EditUserComponent = props => {
  const navigation = useNavigation();
  const [firstname, setFirstname] = useState(props.route.params.firstname);
  const [lastname, setLastname] = useState(props.route.params.lastname);
  const [email, setEmail] = useState(props.route.params.email);
  const [username, setUsername] = useState(props.route.params.username);
  const [role, setRole] = useState(props.route.params.role);
  const userid = props.route.params.userid;

  const updateUserInfo = async () => {
    let roleid = 1;
    if (role === 'User') {
      roleid = 2;
    }

    try {
      await updateUserDetails(
        firstname,
        lastname,
        email,
        username,
        roleid,
        userid,
      );
      navigation.navigate('Users');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.background}>
      <SharedBackHeaderBar title="User Information" />
      <View style={styles.container}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFirstname}
          value={firstname}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLastname}
          value={lastname}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        />

        <Text style={styles.label}>Role</Text>
        <Picker
          style={{width: 150, marginLeft: 5}}
          mode={'dropdown'}
          selectedValue={role}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="User" value="User" />
        </Picker>

        <Pressable style={styles.btn} onPress={updateUserInfo}>
          <Text style={styles.btnText}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#6877ca',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

    marginHorizontal: 40,
    marginVertical: 40,
    backgroundColor: 'white',

    borderRadius: 10,
  },
  header: {
    color: '#3F51B5',
    fontSize: 16,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  label: {paddingLeft: 20},

  input: {
    borderBottomColor: '#daddf1',
    borderBottomWidth: 1,
    paddingBottom: 2,
    width: 200,
    marginBottom: 25,
    marginLeft: 20,
  },
  btn: {
    alignSelf: 'center',
    paddingVertical: 8,
    width: 100,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#3F51B5',
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditUserComponent;
