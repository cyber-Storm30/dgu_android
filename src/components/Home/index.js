import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Doctors from './Doctors';
import Hospitals from './Hospitals';
import User from './User';
import TaskList from './User/TaskList';
import Discussion from './User/Discussion';
import SingleTaskList from './User/SingleTaskList';

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
          backgroundColor: '#141414',
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
            <View>
              <Text style={{color: 'white'}}>Doctors</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Hospitals"
        component={Hospitals}
        options={{
          tabBarIcon: ({color, size}) => (
            <View>
              <Text style={{color: 'white'}}>Hospitals</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({color, size}) => (
            <View>
              <Text style={{color: 'white'}}>Profile</Text>
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
