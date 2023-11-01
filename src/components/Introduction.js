import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import React from 'react';
import IntroIcon from '../../assets/introduction.png';

const Introduction = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <Text style={{fontSize: 28, color: 'black', paddingTop: 20}}>
        About us
      </Text>
      <Image source={IntroIcon} style={{width: 200, height: 200}} />
      <Text
        style={{
          fontSize: 16,
          paddingHorizontal: 10,
          color: 'black',
          marginTop: 20,
        }}>
        The primary purpose of this dedicated healthcare application that serves
        as a beacon of support and empowerment for those living with
        neurological conditions. Through a comprehensive suite of features and
        functionalities, this innovative app is designed to enhance the quality
        of life for patients while facilitating better communication with
        healthcare professionals.
      </Text>
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
          position: 'absolute',
          bottom: 15,
        }}>
        <Text style={{color: 'white', fontSize: 18}}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Introduction;
