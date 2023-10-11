import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {baseURL} from '../../Services/apiClient';
import DocumentPicker from 'react-native-document-picker';

const Onboarding = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const [selectedItem, setSelectedItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [pdfLink, setPdfLink] = useState('');
  const [pdfName, setPdfName] = useState('');
  const {width, height} = useWindowDimensions();
  const data = [
    'Cerebrovascular disease',
    'Epilepsy',
    'Alzheimer Disease',
    'Dementia',
    'other',
  ];

  const handleSelect = item => {
    if (!selectedItem.includes(item)) setSelectedItem([...selectedItem, item]);
    else {
      var arr = selectedItem.slice();
      arr = selectedItem.filter(i => i !== item);
      setSelectedItem(arr);
    }
  };

  const handleSubmit = async () => {
    if (selectedItem.length > 0) {
      try {
        const newName = Date.now() + ' - ' + pdfName;
        setLoading(true);
        const formData = new FormData();
        formData.append('file', {
          uri: pdfLink,
          type: 'application/pdf',
          name: newName,
        });
        const URL = `${baseURL}/upload`;
        const res = await fetch(URL, {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res);
        if (res.status === 200) {
          try {
            const res = await axios.put(`${baseURL}/user/save/form`, {
              userId: user?._id,
              disease: selectedItem,
              document: newName,
            });
            console.log(res);
            if (res.status === 200) {
              navigation.navigate('Home');
            }
          } catch (err) {
            console.log(err);
            Alert.alert('Some error occured');
          } finally {
            setLoading(false);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Select something first');
    }
  };

  const handleUploadPdf = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      console.log('101', JSON.stringify(res));
      setPdfLink(res.fileCopyUri);
      setPdfName(res.name);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        //If user canceled the document selection
        console.log('Canceled from single doc picker');
      } else {
        //For Unknown Error
        console('Unknown Error: ' + JSON.stringify(error));
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={47}
        behavior={Platform.OS === 'ios' ? 'padding' : 'margin'}
        style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 32,
            color: 'black',
            marginTop: 50,
          }}>
          Patient's Information
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              marginTop: 50,
              marginLeft: 30,
            }}>
            Select your disorder
          </Text>
        </TouchableOpacity>
        <ScrollView style={{flex: 1, marginTop: 20, marginLeft: 30}}>
          {data?.map((d, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleSelect(d)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                backgroundColor: selectedItem.includes(d) ? '#0AC5DD' : 'white',
                width: width - 60,
                paddingHorizontal: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selectedItem.includes(d) ? '#0AC5DD' : 'gray',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: selectedItem.includes(d) ? 'white' : 'gray',
                }}>
                {d}
              </Text>
            </TouchableOpacity>
          ))}
          {/* <TouchableOpacity
            onPress={() => {
              setIsOther(!isOther);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              backgroundColor: 'white',
              width: width - 60,
              paddingHorizontal: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'gray',
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'gray',
              }}>
              Other
            </Text>
          </TouchableOpacity> */}
          {isOther && (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Specify your disease
              </Text>
              <TextInput
                style={{
                  width: width - 60,
                  height: 50,
                  borderRadius: 10,
                  marginTop: 10,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'gray',
                }}
                placeholder="Specify your disease"
              />
            </View>
          )}
          <TouchableOpacity
            onPress={handleUploadPdf}
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
            <Text style={{fontSize: 18, color: 'white'}}>Upload document</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
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
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{fontSize: 18, color: 'white'}}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Onboarding;
