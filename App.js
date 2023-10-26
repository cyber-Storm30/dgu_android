// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/Home/Login';
import Launch from './src/components/Launch';
import Signup from './src/components/Signup';
import Onboarding from './src/components/Onboarding';
import {useSelector} from 'react-redux';
import Home from './src/components/Home';
import DoctorLogin from './src/components/DoctorLogin';
import DoctorHome from './src/components/DoctorHome';
import CreateTask from './src/components/DoctorHome/CreateTask';
import Discussion from './src/components/DoctorHome/Discussion';
import TaskList from './src/components/DoctorHome/TaskList';
import SingleTaskList from './src/components/DoctorHome/SingleTaskList';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const Stack = createNativeStackNavigator();

const App = () => {
  const user = useSelector(state => state.auth.user);
  const doctor = useSelector(state => state.auth.doctor);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}
        initialRouteName={
          !user?._id && doctor?._id
            ? 'DoctorHome'
            : !user?._id && !doctor?._id
            ? 'Launch'
            : 'Home'
        }>
        <Stack.Screen name="Launch" component={Launch} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DoctorHome" component={DoctorHome} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="DoctorDiscussion" component={Discussion} />
        <Stack.Screen name="DoctorTaskList" component={TaskList} />
        <Stack.Screen name="DoctorSingleTaskList" component={SingleTaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
