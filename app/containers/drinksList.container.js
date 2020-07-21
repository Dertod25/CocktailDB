import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, SectionList, SafeAreaView, View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListItem from '../components/listItem.component';
import Indicator from '../components/indicator.component';
import {getCategoryDrinks, refreshDrinks} from '../redux/actions/drinks';
import {setStatusModal} from '../redux/actions/online';
import {styles} from '../styles/root.style';

const GalleryList = ({navigation}) => {
  const drinks = useSelector((state) => state.drinks.drinks);
  const nextActualCategory = useSelector(
    (state) => state.drinks.nextActualCategory
  );
  const isLoading = useSelector((state) => state.drinks.isLoading);
  const isConnected = useSelector((state) => state.online.isConnected);
  const dispatch = useDispatch();
  const onRefresh = () => {
    isConnected
      ? nextActualCategory && dispatch(getCategoryDrinks(nextActualCategory))
      : dispatch(setStatusModal(true));
  };

  useFocusEffect(
    useCallback(() => {
      isConnected ? dispatch(refreshDrinks()) : dispatch(setStatusModal(true));
    }, [])
  );

  return (
    <SafeAreaView style={styles.fullFlex}>
      <Indicator isShow={isLoading} />
      {drinks.length === 0 && !nextActualCategory && (
        <View style={[styles.centerContainer, styles.m20]}>
          <Text style={styles.listItemTitle}>No category selected.</Text>
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemTitle}>Please, select a </Text>
            <Pressable onPress={() => navigation.navigate('FiltersList')}>
              <Text style={styles.textLink}>CATEGORY</Text>
            </Pressable>
          </View>
        </View>
      )}
      <SectionList
        sections={drinks}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <ListItem item={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listSectionTitle}>{title}</Text>
        )}
        onEndReached={onRefresh}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default React.memo(GalleryList);
