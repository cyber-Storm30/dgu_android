import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Tasks from './Tasks';
import BackButton from '../../BackButton';

const SingleTaskList = ({route, navigation}) => {
  console.log(route.params);
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButton
        onPress={() => {
          navigation.navigate('TaskList', {
            doctorId: route?.params?.doctorId,
            userId: route?.params?.userId,
          });
        }}
      />
      <Text style={{fontSize: 20, marginTop: 10, marginLeft: 10}}>
        Your task list
      </Text>
      <View style={{flex: 1, alignItems: 'center'}}>
        {route?.params?.data?.map((data, idx) => (
          <Tasks
            data={data}
            key={idx}
            fullData={route.params.data}
            taskId={route?.params?.taskId}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SingleTaskList;
