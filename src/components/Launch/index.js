import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import LaunchIcon from '../../../assets/launch.jpeg';
import LogoIcon from '../../../assets/logo.png';

const Launch = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
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
      <Image source={LaunchIcon} style={{width, height: 300}} />
      <Text
        style={{
          textAlign: 'center',
          color: '#000',
          fontSize: 32,
          marginTop: 32,
        }}>
        Welcome to DGU
      </Text>
      <View style={{position: 'absolute', bottom: 20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{
            width: width - 40,
            height: 50,
            borderRadius: 5,
            backgroundColor: '#0AC5DD',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}
          style={{
            width: width - 40,
            height: 50,
            borderRadius: 5,
            backgroundColor: '#0AC5DD',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Launch;
