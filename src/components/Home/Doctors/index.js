import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DoctorCard from './DoctorCard';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../../redux/auth';

const Doctors = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const getData = async () => {
    try {
      const res = await axios.get(`${baseURL}/doctor`);
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
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
          Doctors around you
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {doctors?.map((doctor, idx) => {
            return (
              <DoctorCard data={doctor} key={idx} navigation={navigation} />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Doctors;
