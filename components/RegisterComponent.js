import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {getRole, register} from '../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Checkbox, HelperText, Snackbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setDrawerItem} from '../storage/actions/actions';

const RegisterComponent = () => {
  //#region state declerations
  const navigation = useNavigation();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [touchedFN, setTouchedFN] = useState(false);
  const [touchedLN, setTouchedLN] = useState(false);
  const [touchedE, setTouchedE] = useState(false);
  const [touchedU, setTouchedU] = useState(false);
  const [touchedP, setTouchedP] = useState(false);
  const [touchedCP, setTouchedCP] = useState(false);

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  //#endregion

  const dispatch = useDispatch();

  const registerUser = async () => {
    try {
      const result = await register(
        firstname,
        lastname,
        email,
        username,
        password,
      );
      setVisible(true);
      await AsyncStorage.setItem('token', result.accessToken);
      const role = await getRole();
      await AsyncStorage.setItem('role', role[0].roleid.toString());
      await AsyncStorage.setItem('id', role[0].userid.toString());
      return role[0].roleid;
    } catch (e) {
      alert(e.error); //todo global error handler
      return 0;
    }
  };

  const checkForm = () => {
    if (
      firstname &&
      lastname &&
      email &&
      username &&
      password &&
      isEmail &&
      isPassword &&
      password === confirmPassword &&
      checked
    ) {
      registerUser().then(res => {
        if (res != 0) {
          dispatch(setDrawerItem('Home'));
          navigation.reset({
            index: 0,
            routes: [{name: 'Menu', params: {role: res}}],
          });
        }
      });
    } else {
      alert('Please fill in  the form!');
    }
  };

  const ErrorDisplay = props => {
    return <Text style={styles.error}>{props.message}</Text>;
  };

  const checkEmail = value => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(value)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };

  const checkPassword = value => {
    if (value.length >= 5) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

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
              placeholder="First Name *"
              onChangeText={setFirstname}
              onEndEditing={() => setTouchedFN(true)}
            />
            {!firstname && touchedFN ? (
              <ErrorDisplay message="First name is required" />
            ) : (
              <ErrorDisplay message="" />
            )}

            <TextInput
              style={styles.input}
              placeholder="Last Name *"
              onChangeText={setLastname}
              onEndEditing={() => setTouchedLN(true)}
            />
            {!lastname && touchedLN ? (
              <ErrorDisplay message="Last name is required" />
            ) : (
              <ErrorDisplay message="" />
            )}

            <TextInput
              style={styles.input}
              placeholder="Email *"
              onChangeText={value => {
                setEmail(value);
                checkEmail(value);
              }}
              onEndEditing={() => {
                setTouchedE(true);
              }}
            />
            {!email && touchedE ? (
              <ErrorDisplay message="Email is required" />
            ) : !isEmail && touchedE ? (
              <ErrorDisplay message="Please provide a valid email address" />
            ) : (
              <ErrorDisplay message="" />
            )}

            <TextInput
              style={styles.input}
              placeholder="Username *"
              onChangeText={setUsername}
              onEndEditing={() => setTouchedU(true)}
            />
            {!username && touchedU ? (
              <ErrorDisplay message="Username is required" />
            ) : (
              <ErrorDisplay message="" />
            )}
            <TextInput
              style={styles.input}
              placeholder="Password *"
              secureTextEntry={true}
              onChangeText={value => {
                setPassword(value);
                checkPassword(value);
              }}
              onEndEditing={() => {
                setTouchedP(true);
              }}
            />
            {!password && touchedP ? (
              <ErrorDisplay message="Password is required" />
            ) : !isPassword && touchedP ? (
              <ErrorDisplay message="Minimum length: 5 characters" />
            ) : (
              <ErrorDisplay message="" />
            )}

            <TextInput
              style={styles.input}
              placeholder="Confirm Password *"
              secureTextEntry={true}
              onChangeText={value => {
                setConfirmPassword(value);
                setTouchedCP(true);
              }}
            />
            {!confirmPassword && touchedCP ? (
              <ErrorDisplay message="Please type again your password" />
            ) : !(
                password === confirmPassword &&
                password &&
                touchedP &&
                touchedCP
              ) && touchedCP ? (
              <ErrorDisplay message="The passwords don't match" />
            ) : (
              <ErrorDisplay message="" />
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color={'#3F51B5'}
              />
              <Text style={{fontSize: 12}}>
                I accept the Terms and Conditions
              </Text>
            </View>

            <Pressable style={styles.btn} onPress={checkForm}>
              <Text style={styles.btnText}>Register</Text>
            </Pressable>

            <Snackbar
              visible={visible}
              onDismiss={() => setVisible(false)}
              style={{backgroundColor: '#7e88ce'}}>
              User registered successfully!
            </Snackbar>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  form: {
    height: 590,
    width: 250,
    alignSelf: 'center',
  },
  title: {
    paddingVertical: 35,
    color: '#3F51B5',
    fontSize: 20,
  },
  input: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    paddingBottom: 2,
    width: 200,
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
  error: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
    paddingLeft: 30,
    marginBottom: 5,
  },
});

export default RegisterComponent;
