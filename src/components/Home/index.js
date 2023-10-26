import {View, Text, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Doctors from './Doctors';
import Hospitals from './Hospitals';
import User from './User';
import TaskList from './User/TaskList';
import Discussion from './User/Discussion';
import SingleTaskList from './User/SingleTaskList';
import Offers from './Offers';
import HospitalIcon from '../../../assets/hospital.png';
import DoctorIcon from '../../../assets/doctor.png';
import OfferIcon from '../../../assets/offer.png';
import AccountIcon from '../../../assets/profile.png';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Doctors'}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        animation: 'slide_from_right',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Doctors"
        component={Doctors}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems: 'center'}}>
              <Image source={DoctorIcon} style={{width: 25, height: 25}} />
              <Text style={{color: 'black', fontSize: 10}}>Doctors</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Hospitals"
        component={Hospitals}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems: 'center'}}>
              <Image source={HospitalIcon} style={{width: 25, height: 25}} />
              <Text style={{color: 'black', fontSize: 10}}>Hospitals</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems: 'center'}}>
              <Image source={OfferIcon} style={{width: 25, height: 25}} />
              <Text style={{color: 'black', fontSize: 10}}>Offers</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems: 'center'}}>
              <Image source={AccountIcon} style={{width: 25, height: 25}} />
              <Text style={{color: 'black', fontSize: 10}}>Profile</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TaskList"
        component={TaskList}
        options={{tabBarButton: () => null, tabBarVisible: false}}
      />
      <Tab.Screen
        name="SingleTaskList"
        component={SingleTaskList}
        options={{tabBarButton: () => null, tabBarVisible: false}}
      />
      <Tab.Screen
        name="Discussion"
        component={Discussion}
        options={{tabBarButton: () => null, tabBarVisible: false}}
      />
    </Tab.Navigator>
  );
};

export default Home;
