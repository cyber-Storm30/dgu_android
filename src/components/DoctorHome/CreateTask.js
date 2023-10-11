import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../Services/apiClient';
import {useSelector} from 'react-redux';
import BackButton from '../BackButton';

const CreateTask = ({route, navigation}) => {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const doctor = useSelector(state => state.auth.doctor);

  const {width} = useWindowDimensions();

  const handleAddTask = () => {
    if (text.length > 0) {
      const newObj = {
        isCompleted: false,
        desc: text,
      };
      setTasks([...tasks, newObj]);
      setText('');
    }
  };

  const handleSubitTask = async () => {
    try {
      const res = await axios.post(`${baseURL}/doctor/create/task`, {
        doctorId: doctor?._id,
        userId: route?.params.userId,
        tasks,
      });
      if (res.status === 200) {
        navigation.navigate('DoctorHome');
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = idx => {
    setTasks(tasks?.filter((data, index) => idx !== index));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text
        style={{
          fontSize: 24,
          color: 'black',
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
        Add Tasks
      </Text>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            width: 350,
            height: 50,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: '#0AC5DD',
          }}>
          <TextInput
            onChangeText={val => {
              setText(val);
            }}
            value={text}
            style={{color: 'black'}}
            placeholder="Add tasks"
            placeholderTextColor="black"
          />
        </View>
        <ScrollView>
          {tasks?.map((data, idx) => (
            <View
              style={{
                width: width - 60,
                borderWidth: 1,
                borderColor: 'gray',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                borderRadius: 10,
                marginBottom: 10,
              }}>
              <Text key={idx} style={{fontSize: 14, color: 'black'}}>
                {data?.desc}
              </Text>
              <TouchableOpacity
                hitSlop={20}
                onPress={() => {
                  handleDeleteTask(idx);
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={handleAddTask}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            backgroundColor: '#0AC5DD',
            width: 100,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 16, color: 'white'}}>Add task</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignItems: 'center',
          width: width,
        }}>
        <TouchableOpacity
          onPress={handleSubitTask}
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
          <Text style={{fontSize: 18, color: 'white'}}>Submit task list</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateTask;
