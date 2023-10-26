import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import HospitalCard from './HospitalCard';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import {useFocusEffect} from '@react-navigation/native';

const Hospitals = () => {
  const {width, height} = useWindowDimensions();
  const [hospitals, setHospitals] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const getData = async () => {
    try {
      const res = await axios.get(`${baseURL}/hospital`);
      setHospitals(res.data);
    } catch (err) {
      Alert.alert('Network error,Try again later');
    }
  };

  const accessLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      accessLocation();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        style={{height: height / 2}}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        pinColor={'red'} // any color
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          width,
        }}>
        <Text
          style={{
            fontSize: 28,
            textTransform: 'capitalize',
            marginBottom: 10,
            color: 'black',
          }}>
          Hospitals around you
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {hospitals?.map((doctor, idx) => {
            return <HospitalCard data={doctor} key={idx} offer={false} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Hospitals;
