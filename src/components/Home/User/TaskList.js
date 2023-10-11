import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';
import Tasks from './Tasks';
import BackButton from '../../BackButton';

const TaskList = ({route, navigation}) => {
  const [tasks, setTasks] = useState([]);
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const getTaskList = async () => {
    try {
      const res = await axios.post(`${baseURL}/doctor/view/tasks`, {
        doctorId: route?.params?.doctorId,
        userId: route?.params?.userId,
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowTasks = (data, taskId) => {
    navigation.navigate('SingleTaskList', {
      data: data,
      doctorId: route?.params?.doctorId,
      userId: route?.params?.userId,
      taskId: taskId,
    });
  };

  useEffect(() => {
    getTaskList();
  }, [route]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButton
        onPress={() => {
          navigation.navigate('User');
        }}
      />
      <Text
        style={{fontSize: 20, marginTop: 10, marginLeft: 10, color: 'black'}}>
        Your tasks
      </Text>
      <View style={{flex: 1, alignItems: 'center'}}>
        {tasks?.map((data, idx) => (
          <View key={idx}>
            <TouchableOpacity
              onPress={() => {
                handleShowTasks(data?.tasks, data?._id);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                backgroundColor: '#0AC5DD',
                width: width - 60,
                borderRadius: 10,
                marginTop: 20,
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>Task {idx + 1}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TaskList;
