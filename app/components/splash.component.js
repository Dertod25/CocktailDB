import React from 'react';
import {View, Image} from 'react-native';
import {styles} from '../styles/root.style';

const Splash = () => {
  return (
    <View style={[styles.centerContainer, styles.fullFlex]}>
      <Image source={require('../images/logo.png')} />
    </View>
  );
};

export default Splash;
