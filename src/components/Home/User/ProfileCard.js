import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AccountImage from '../../../../assets/account.png';

import {logout} from '../../../redux/auth';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';

const ProfileCard = ({showPdf, navigation, user}) => {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();

  return (
    <View
      style={{
        width: width - 40,
        backgroundColor: '#1CDAF2',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            hight: 50,
          }}
          onPress={() => {
            console.log('done');
            dispatch(logout());
            navigation.navigate('Login');
          }}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={AccountImage}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            marginLeft: 10,
          }}
        />
      </View>
      <Text style={{marginTop: 5, marginBottom: 5}}>
        {user?.firstname + ' ' + user?.lastname}
      </Text>
      <Text style={{fontSize: 16, color: 'black'}}>Diseases</Text>
      {user?.disease?.map((d, idx) => (
        <Text style={{marginBottom: 5}} key={idx}>
          {d}
        </Text>
      ))}
      <TouchableOpacity
        onPress={showPdf}
        style={{
          backgroundColor: '#0CA0B3',
          width: 150,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <Text style={{color: 'white'}}>View Document</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;
