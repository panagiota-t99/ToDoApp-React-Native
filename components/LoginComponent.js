import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {getRole, login} from '../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginComponent = ({navigation}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    getToken();
  });

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        navigation.replace('Menu');
      }
    } catch (e) {
      alert(e);
    }
  };

  async function getLoginData() {
    if (username && password) {
      try {
        const result = await login(username, password);
        if (result.accessToken) {
          try {
            await AsyncStorage.setItem('token', result.accessToken);
          } catch (e) {
            alert(e);
          }

          try {
            const role = await getRole();
            if (role) {
              try {
                AsyncStorage.setItem('role', role[0].roleid.toString());
                if (role[0].roleid === 2) {
                  navigation.replace('Menu');
                }
              } catch (e) {}
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          alert(result.message);
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert('Please fill in the form!');
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.image}>
        <ImageBackground
          source={require('../assets/form.png')}
          style={styles.form}>
          <View style={styles.formContent}>
            <Text style={styles.title}>ToDos</Text>
            <TextInput
              style={styles.input}
              placeholder="Username *"
              onChangeText={value => {
                setUsername(value);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password *"
              onChangeText={value => {
                setPassword(value);
              }}
            />
            <Pressable
              style={styles.btn}
              onPress={async () => {
                await getLoginData();
              }}>
              <Text style={styles.btnText}>Login</Text>
            </Pressable>
            <Text style={{paddingTop: 20, fontSize: 12}}>
              Not registered yet?
            </Text>
            <Pressable
              style={{paddingTop: 5}}
              onPress={() => {
                alert('hi');
              }}>
              <Text style={{color: '#3F51B5'}}>Create an account</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {
    flex: 1,
    width: '100%',
  },
  form: {
    height: 360,
    width: 250,
    alignSelf: 'center',
    marginVertical: 125,
  },
  title: {
    paddingVertical: 40,
    color: '#3F51B5',
    fontSize: 20,
  },
  input: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    paddingBottom: 2,
    width: 200,
    marginBottom: 20,
  },
  formContent: {
    alignItems: 'center',
  },
  btn: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 85,
    borderRadius: 4,
    elevation: 2,
    backgroundColor: '#3F51B5',
  },
  btnText: {
    color: 'white',
  },
});

export default LoginComponent;
