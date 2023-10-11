import {
  View,
  Text,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {baseURL} from '../../Services/apiClient';
import {useSelector} from 'react-redux';
import DiscussionCard from '../Home/User/DiscussionCard';
import BackButton from '../BackButton';

const Discussion = ({route, navigation}) => {
  const [discussion, setDiscussion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState('');
  const [counter, setCounter] = useState(0);
  const doctor = useSelector(state => state.auth.doctor);

  console.log(route.params);

  const getDiscussion = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/discussion/get`, {
        receiver: route?.params?.doctorId,
        sender: route?.params?.userId,
      });
      console.log(res.data);
      setDiscussion(res.data);
    } catch (err) {
      Alert.alert('Some error occured,try again later');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    try {
      const res = await axios.post(`${baseURL}/discussion/create`, {
        sender: route?.params?.doctorId,
        receiver: route?.params?.userId,
        body,
      });
      if (res.status === 200) {
        setBody('');
        setCounter(counter + 1);
      }
    } catch (err) {
      Alert.alert('Some error occured,try again later');
    }
  };

  useEffect(() => {
    getDiscussion();
  }, [counter]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButton
        onPress={() => {
          navigation.navigate('DoctorHome');
        }}
      />
      <Text
        style={{fontSize: 24, marginTop: 10, marginLeft: 10, color: 'black'}}>
        Discussions
      </Text>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={{flex: 1, paddingTop: 20}}>
          {discussion?.map((data, idx) => {
            return (
              <DiscussionCard
                key={idx}
                data={data}
                user={doctor?._id}
                sender={data?.sender}
                receiver={data?.receiver}
                index={idx}
              />
            );
          })}
        </ScrollView>
      )}
      <View
        style={{
          borderWidth: 1,
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 10,
        }}>
        <TextInput
          placeholder="send message"
          onChangeText={val => {
            setBody(val);
          }}
          value={body}
          style={{
            alignItems: 'center',
            height: '100%',
            width: '94%',
          }}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Image
            style={{width: 20, height: 20}}
            source={{
              uri: 'https://w7.pngwing.com/pngs/136/842/png-transparent-send-cursor-arrow-button-user-interface-outline-icon.png',
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Discussion;
