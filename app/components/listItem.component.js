import React from 'react';
import {View, Image, Text} from 'react-native';
import {styles} from '../styles/root.style';

const ListItem = (props) => {
  const {urlImage, title} = props.item;
  return (
    <View style={styles.listItemContainer}>
      <Image
        style={styles.listItemImage}
        source={{
          uri: urlImage + '/preview',
        }}
      />
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemTitle}>{title}</Text>
      </View>
    </View>
  );
};

export default ListItem;
