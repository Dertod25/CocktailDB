import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colors, styles} from '../styles/root.style';

const Indicator = ({isShow}) => {
  return isShow ? (
    <View styles={styles.indicatorContainer}>
      <ActivityIndicator
        size="small"
        color={colors.darkred}
        animating={isShow}
      />
    </View>
  ) : null;
};

export default Indicator;
