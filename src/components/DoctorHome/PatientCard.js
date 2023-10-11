import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Pdf from 'react-native-pdf';
import CreateTask from './CreateTask';
import {baseURL2} from '../../Services/apiClient';

const PatientCard = ({data, setViewPdf, setNewUrl, navigation}) => {
  const {width, height} = useWindowDimensions();
  const pf = `${baseURL2}images/`;
  const doctor = useSelector(state => state.auth.doctor);

  const showPdf = () => {
    setViewPdf(true);
    setNewUrl(pf + data?.document);
  };

  const handleNavigate = () => {
    navigation.navigate('CreateTask', {userId: data?._id});
  };

  return (
    <View
      style={{
        width: width - 40,
        backgroundColor: '#1CDAF2',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        marginBottom: 10,
      }}>
      {/* <Image
        style={{width: 50, height: 50, borderRadius: 50}}
        source={{
          uri: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aHVtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        }}
      /> */}
      <Text
        style={{marginTop: 5, marginBottom: 5, fontSize: 18, color: 'black'}}>
        Name:- {data?.firstname + ' ' + data?.lastname}
      </Text>
      <Text style={{fontSize: 16, color: 'black'}}>Diseases</Text>
      {data?.disease?.map(d => (
        <Text style={{marginBottom: 5}}>{d}</Text>
      ))}
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DoctorTaskList', {
              doctorId: doctor?._id,
              userId: data?._id,
            });
          }}
          style={{
            backgroundColor: '#0CA0B3',
            width: 150,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <Text style={{color: 'white'}}>View Patients tasks</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity
          onPress={handleNavigate}
          style={{
            backgroundColor: '#0CA0B3',
            width: 150,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <Text style={{color: 'white'}}>Create Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DoctorDiscussion', {
              doctorId: doctor?._id,
              userId: data?._id,
            });
          }}
          style={{
            backgroundColor: '#0CA0B3',
            width: 150,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <Text style={{color: 'white'}}>Discussion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientCard;
