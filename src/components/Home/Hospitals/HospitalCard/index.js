import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AccountImage from '../../../../../assets/account.png';

const HospitalCard = ({data, offer, offerValue}) => {
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
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 3,
          color: 'black',
          marginBottom: 10,
          fontWeight: '500',
        }}>
        Name: {''}
        <Text
          style={{
            fontSize: 14,
            marginBottom: 3,
            color: 'black',
            marginBottom: 10,
          }}>
          {data?.name}
        </Text>
      </Text>
      {!offer && (
        <Text
          style={{
            fontSize: 16,
            marginBottom: 3,
            color: 'black',
            marginBottom: 10,
            fontWeight: '500',
          }}>
          Phone: {''}
          <Text
            style={{
              fontSize: 14,
              marginBottom: 3,
              color: 'black',
              marginBottom: 10,
            }}>
            {data?.mobile}
          </Text>
        </Text>
      )}
      {!offer && (
        <Text
          style={{
            fontSize: 16,
            marginBottom: 3,
            color: 'black',
            marginBottom: 10,
            fontWeight: '500',
          }}>
          Work hour: {''}
          <Text
            style={{
              fontSize: 14,
              marginBottom: 3,
              color: 'black',
              marginBottom: 10,
            }}>
            {data?.workHour}
          </Text>
        </Text>
      )}
      {!offer && (
        <Text
          style={{
            fontSize: 16,
            marginBottom: 3,
            color: 'black',
            marginBottom: 10,
            fontWeight: '500',
          }}>
          Address: {''}
          <Text
            style={{
              fontSize: 14,
              marginBottom: 3,
              color: 'black',
              marginBottom: 10,
            }}>
            {data?.address}
          </Text>
        </Text>
      )}
      {offer && (
        <Text
          style={{
            fontSize: 16,
            marginBottom: 3,
            color: 'black',
            marginBottom: 10,
            fontWeight: '500',
          }}>
          Discount: {''}
          <Text
            style={{
              fontSize: 14,
              marginBottom: 3,
              color: 'black',
              marginBottom: 10,
            }}>
            {(Math.floor(Math.random() * 3) + 1) * offerValue + '%'} discount
            available on purchase of 499 and above
          </Text>
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default HospitalCard;
