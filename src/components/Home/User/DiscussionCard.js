import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const DiscussionCard = ({data, sender, receiver, index, user}) => {
  return (
    <>
      {user === sender ? (
        <View
          style={{
            alignSelf: 'flex-end',
            backgroundColor: 'lightgray',
            height: 30,
            marginBottom: 10,
            paddingRight: 30,
            justifyContent: 'center',
            borderRadius: 5,
            marginRight: 10,
            paddingLeft: 5,
            color: 'black',
          }}>
          <Text>{data?.body}</Text>
        </View>
      ) : (
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#06B1C7',
            height: 30,
            marginBottom: 10,
            paddingRight: 30,
            justifyContent: 'center',
            borderRadius: 5,
            marginLeft: 10,
            paddingLeft: 5,
          }}>
          <Text>{data?.body}</Text>
        </View>
      )}
    </>
  );
};

export default DiscussionCard;
