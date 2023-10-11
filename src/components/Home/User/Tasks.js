import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';

const Tasks = ({data, inde, fullData, taskId}) => {
  const {width} = useWindowDimensions();
  const [isCompleted, setIsCompleted] = useState(data?.isCompleted);

  const handleTaskDone = async () => {
    console.log(taskId);
    if (!isCompleted) {
      fullData.map(d => {
        if (d._id === data?._id) {
          d.isCompleted = true;
        }
      });
      setIsCompleted(!isCompleted);
    } else {
      fullData.map(d => {
        if (d._id === data?._id) {
          d.isCompleted = false;
        }
      });
      setIsCompleted(!isCompleted);
    }
    try {
      console.log('full', fullData);
      const res = await axios.post(`${baseURL}/user/task/done`, {
        taskId: taskId,
        tasks: fullData,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 50,
        backgroundColor: '#0AC5DD',
        width: width - 60,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'space-between',
      }}>
      {isCompleted ? (
        <Text
          style={{
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid',
          }}>
          {data?.desc}
        </Text>
      ) : (
        <Text>{data?.desc}</Text>
      )}
      <View>
        {!isCompleted ? (
          <TouchableOpacity onPress={handleTaskDone}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 20,
              }}
              source={{
                uri: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-tick-vector-icon-png-image_4019322.jpg',
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleTaskDone}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 10,
              }}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBropPbvzN4Ny3TX0sKmIz3hI5tPzzau5sp9PaTp_Nu8766A_koqbXsqiJ3Oqw-d05Vw&usqp=CAU',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Tasks;
