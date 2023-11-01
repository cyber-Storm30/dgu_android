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
  Platform,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/auth';
import LoginImage from '../../../../assets/login.jpeg';
import LogoIcon from '../../../../assets/logo.png';
import CrossIcon from '../../../../assets/cross.png';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [contactUs, setContactUs] = useState(false);
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/user/login`, {
        email,
        password,
      });
      console.log(res);
      dispatch(setUser(res.data));
      if (res.status === 200) {
        navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
          height: 300,
          objectFit: 'contain',
          marginBottom: 20,
          position: 'absolute',
          zIndex: -1000,
          top: Platform.OS === 'ios' ? 0 : -20,
        }}
      />
      <View
        style={{
          width: width,
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 32,
            marginRight: 20,
            marginBottom: 200,
            textAlign: 'center',
          }}>
          {/* Welcome Back */}
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
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{color: 'black', marginRight: 10}}>New here?</Text>
          <TouchableWithoutFeedback onPress={handleNavigate}>
            <Text style={{color: '#00B9D0'}}>Signup</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{color: 'black', marginRight: 10}}>
            Are you a doctor?
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('DoctorLogin');
            }}>
            <Text style={{color: '#00B9D0'}}>Login here</Text>
          </TouchableWithoutFeedback>
        </View>
        {contactUs && (
          <Modal transparent={true}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: width - 40,
                  height: 100,
                  backgroundColor: '#ADD8E6',
                  borderRadius: 20,
                  padding: 20,
                }}>
                <TouchableOpacity
                  style={{position: 'absolute', right: 10, top: 10}}
                  onPress={() => {
                    setContactUs(false);
                  }}>
                  <Image
                    source={CrossIcon}
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                </TouchableOpacity>

                <Text style={{marginBottom: 10, color: 'black'}}>
                  📞(02)1234567
                </Text>
                <Text style={{marginBottom: 10, color: 'black'}}>
                  📩 Dontgiveup.team@hotmail.com
                </Text>
              </View>
            </View>
          </Modal>
        )}
        <TouchableOpacity
          style={{position: 'absolute', bottom: 30}}
          onPress={() => {
            setContactUs(true);
          }}>
          <Text>Contact us</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
