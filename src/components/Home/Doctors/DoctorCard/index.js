import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AccountImage from '../../../../../assets/account.png';
import axios from 'axios';
import {baseURL} from '../../../../Services/apiClient';
import {useSelector} from 'react-redux';

const DoctorCard = ({data, isInProfile, navigation}) => {
  const {width, height} = useWindowDimensions();
  const user = useSelector(state => state.auth.user);
  const [isContacted, setIsContacted] = useState(
    data?.patients.includes(user?._id) ? true : false,
  );

  const handleContactDoctor = async () => {
    setIsContacted(!isContacted);
    try {
      const res = await axios.post(`${baseURL}/doctor/contact`, {
        doctorId: data?._id,
        userId: user?._id,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TouchableOpacity
      style={{
        width: width - 40,
        backgroundColor: '#1CDAF2',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View>
        <Image
          source={AccountImage}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            marginRight: 20,
            marginLeft: 20,
          }}
        />
      </View>
      <View>
        <Text style={{fontSize: 21, marginBottom: 3}}>{data?.name}</Text>
        <Text style={{fontSize: 14, marginBottom: 3}}>{data?.degree}</Text>
        <Text style={{fontSize: 14, marginBottom: 3}}>{data?.major}</Text>
        <TouchableOpacity
          onPress={handleContactDoctor}
          style={{
            width: 100,
            height: 30,
            backgroundColor: '#06B1C7',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginTop: 2,
          }}>
          {isContacted ? (
            <Text style={{color: 'white'}}>Contacted</Text>
          ) : (
            <Text style={{color: 'white'}}>Contact</Text>
          )}
        </TouchableOpacity>
      </View>
      {isInProfile && (
        <View style={{position: 'absolute', right: 10, top: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TaskList', {
                doctorId: data._id,
                userId: user._id,
              });
            }}
            style={{
              width: 100,
              height: 30,
              backgroundColor: '#06B1C7',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: 2,
              marginBottom: 10,
            }}>
            <Text style={{color: 'white'}}>Task list</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Discussion', {
                doctorId: data._id,
                userId: user._id,
              });
            }}
            style={{
              width: 100,
              height: 30,
              backgroundColor: '#06B1C7',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: 2,
            }}>
            <Text style={{color: 'white'}}>Discussions</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DoctorCard;
