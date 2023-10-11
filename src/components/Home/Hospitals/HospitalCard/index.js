import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AccountImage from '../../../../../assets/account.png';

const HospitalCard = ({data}) => {
  const {width, height} = useWindowDimensions();
  const [isContacted, setIsContacted] = useState(false);

  const handleContactDoctor = () => {
    setIsContacted(!isContacted);
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
        paddingLeft: 20,
      }}>
      <View>
        <Text style={{fontSize: 21, marginBottom: 3, color: 'black'}}>
          Name:- {data?.name}
        </Text>
        <Text style={{fontSize: 14, marginBottom: 3, color: 'black'}}>
          Address:- {data?.address}
        </Text>
        <Text style={{fontSize: 14, marginBottom: 3, color: 'black'}}>
          Email:- {data?.email}
        </Text>
        <Text style={{fontSize: 14, marginBottom: 3, color: 'black'}}>
          Contact Number:- {data?.mobile}
        </Text>
        {/* 
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
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default HospitalCard;
