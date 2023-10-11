import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      }}
      hitSlop={20}>
      <Image
        style={{width: 20, height: 20}}
        source={{
          uri: 'https://w7.pngwing.com/pngs/666/148/png-transparent-app-application-arrow-back-button-design-direction-dot-element-flat.png',
        }}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
