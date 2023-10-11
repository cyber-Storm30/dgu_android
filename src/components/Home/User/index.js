import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {baseURL, baseURL2} from '../../../Services/apiClient';
import {useFocusEffect} from '@react-navigation/native';
import ProfileCard from './ProfileCard';
import Pdf from 'react-native-pdf';
import DoctorCard from '../Doctors/DoctorCard';
import BackButton from '../../BackButton';

const User = ({navigation}) => {
  const pf = `${baseURL2}images/`;

  const [user, setUser] = useState();
  const [newUrl, setNewUrl] = useState('');
  const [viewPdf, setViewPdf] = useState(false);
  const [loading, setLoading] = useState(false);

  const loggedInUser = useSelector(state => state.auth.user);

  const userData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/user/${loggedInUser?._id}`);
      console.log(res.data);
      setUser(res.data);
      setNewUrl(pf + res.data.document);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      userData();
    }, [navigation]),
  );

  const showPdf = () => {
    setViewPdf(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {!viewPdf && (
        <>
          {loading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 24,
                  marginTop: 20,
                  marginLeft: 20,
                  marginBottom: 5,
                }}>
                Account
              </Text>
              <View style={{flex: 1, paddingLeft: 20}}>
                <ProfileCard
                  showPdf={showPdf}
                  navigation={navigation}
                  user={user}
                />
                <Text style={{marginTop: 10, fontSize: 16, marginBottom: 10}}>
                  Doctors selected
                </Text>
                {user?.doctors?.map((d, idx) => (
                  <DoctorCard
                    data={d}
                    key={idx}
                    isInProfile={true}
                    navigation={navigation}
                  />
                ))}
              </View>
            </View>
          )}
        </>
      )}

      {viewPdf && (
        <View style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <BackButton
              onPress={() => {
                setViewPdf(false);
              }}
            />
          </View>

          <Pdf
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            fitWidth={true}
            trustAllCerts={false}
            style={{flex: 1}}
            source={{
              uri: newUrl,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default User;
