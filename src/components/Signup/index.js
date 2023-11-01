import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../Services/apiClient';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/auth';
import LoginImage from '../../../assets/signup.png';
import LogoIcon from '../../../assets/logo.png';

const Signup = ({navigation}) => {
  const [firstname, setfirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const {width, height} = useWindowDimensions();

  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        setLoading(true);
        const res = await axios.post(`${baseURL}/user/signup`, {
          firstname,
          lastname,
          image: '',
          email,
          password,
        });
        console.log(res.data);
        dispatch(setUser(res.data));
        navigation.navigate('Onboarding');
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Wrong Password');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={LogoIcon}
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          top: Platform.OS === 'ios' ? 25 : 15,
          left: 10,
        }}
      />
      <Image
        source={LoginImage}
        style={{
          width: width,
          height: 150,
          objectFit: 'contain',
          borderRadius: 10,
          marginTop: 10,
        }}
      />
      <View
        style={{
          width: width,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 32,
            marginRight: 20,
            textAlign: 'center',
          }}>
          Create your account
        </Text>
      </View>
      <View style={{alignItems: 'center', flex: 1, paddingTop: 50}}>
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: '#0AC5DD',
          }}>
          <TextInput
            onChangeText={val => {
              setfirstName(val);
            }}
            style={{color: 'black'}}
            placeholder="First name"
            placeholderTextColor="gray"
          />
        </View>
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: '#0AC5DD',
          }}>
          <TextInput
            onChangeText={val => {
              setLastName(val);
            }}
            style={{color: 'black'}}
            placeholder="Last name"
            placeholderTextColor="gray"
          />
        </View>
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: '#0AC5DD',
          }}>
          <TextInput
            onChangeText={val => {
              setEmail(val);
            }}
            style={{color: 'black'}}
            placeholder="Email"
            placeholderTextColor="gray"
          />
        </View>
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: '#0AC5DD',
          }}>
          <TextInput
            onChangeText={val => {
              setPassword(val);
            }}
            style={{color: 'black'}}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: '#0AC5DD',
          }}>
          <TextInput
            onChangeText={val => {
              setConfirmPassword(val);
            }}
            style={{color: 'black'}}
            placeholder="Confirm password"
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            width: 300,
            height: 50,
            borderRadius: 5,
            backgroundColor: '#0AC5DD',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{color: 'white', fontSize: 18}}>Signup</Text>
          )}
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{color: 'black', marginRight: 10}}>Already a user?</Text>
          <TouchableWithoutFeedback onPress={handleNavigate}>
            <Text style={{color: '#00B9D0'}}>Login</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
