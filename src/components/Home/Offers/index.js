import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HospitalCard from '../Hospitals/HospitalCard';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';
// import MapView from 'react-native-maps';

const Offers = () => {
  const {width, height} = useWindowDimensions();
  const [hospitals, setHospitals] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${baseURL}/hospital`);
      console.log(res.data);
      setHospitals(res.data);
    } catch (err) {
      Alert.alert('Network error,Try again later');
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
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
          Offers and Discounts
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {hospitals?.map((doctor, idx) => {
            return (
              <HospitalCard
                data={doctor}
                key={idx}
                offer={true}
                offerValue={10}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Offers;
