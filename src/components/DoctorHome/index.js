import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../Services/apiClient';
import {useDispatch, useSelector} from 'react-redux';
import Pdf from 'react-native-pdf';
import PatientCard from './PatientCard';
import {logout} from '../../redux/auth';
import BackButton from '../BackButton';

const DoctorHome = ({navigation}) => {
  const [patients, setPatients] = useState([]);
  const doctor = useSelector(state => state.auth.doctor);

  const [newUrl, setNewUrl] = useState();
  const dispatch = useDispatch();
  const [viewPdf, setViewPdf] = useState(false);

  const getPatients = async (req, res) => {
    try {
      const res = await axios.get(`${baseURL}/doctor/patients/${doctor?._id}`);
      setPatients(res.data.patients);
      console.log(res.data.patients);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  console.log(viewPdf, newUrl);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!viewPdf && (
        <View style={{flex: 1, paddingVertical: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 20,
            }}>
            <Text style={{fontSize: 28, color: 'black', marginLeft: 20}}>
              Hello, {doctor?.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(logout());
                navigation.navigate('Login');
              }}>
              <Text style={{color: 'red'}}>Logout</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              marginLeft: 20,
              marginTop: 30,
              marginBottom: 10,
            }}>
            Your patients list
          </Text>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}>
            {patients?.map((data, idx) => {
              return (
                <PatientCard
                  data={data}
                  setNewUrl={setNewUrl}
                  setViewPdf={setViewPdf}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
      {viewPdf && (
        <View style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <BackButton
              onPress={() => {
                setViewPdf(false);
              }}
            />
          </View>

          <Pdf
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            fitWidth={true}
            trustAllCerts={false}
            style={{flex: 1}}
            source={{
              uri: newUrl,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DoctorHome;
