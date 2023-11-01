import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../Services/apiClient';
import {useDispatch} from 'react-redux';
import {setDoctor, setUser} from '../../redux/auth';
import DoctorIcon from '../../../assets/doctor1.jpeg';

const DoctorLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/doctor/login`, {
        email,
        password,
      });
      console.log(res);
      dispatch(setDoctor(res.data));
      if (res.status === 200) {
        console.log(res.data);
        navigation.navigate('DoctorHome');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 36,
            marginTop: 100,
            marginRight: 20,
            marginBottom: 100,
            textAlign: 'center',
          }}>
          Doctor Login
          <Image source={DoctorIcon} style={{width: 35, height: 35}} />
        </Text>
      </View>
      <View style={{alignItems: 'center', flex: 1}}>
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
            placeholder="Enter your email"
            placeholderTextColor="black"
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
            placeholder="Enter your password"
            placeholderTextColor="black"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
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
            <Text style={{color: 'white', fontSize: 18}}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DoctorLogin;
