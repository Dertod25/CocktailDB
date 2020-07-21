import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Pressable,
  Image,
  Button,
  SafeAreaView,
  View,
} from 'react-native';
import Indicator from '../components/indicator.component';
import {useDispatch, useSelector} from 'react-redux';
import {styles, colors} from '../styles/root.style';
import {switchFilters} from '../redux/actions/drinks';
import {setStatusModal} from '../redux/actions/online';

const FiltersList = () => {
  const categories = useSelector((state) => state.drinks.categories);
  const savedFilters = useSelector((state) => state.drinks.savedFilters);
  const filters = useSelector((state) => state.drinks.filters);
  const isConnected = useSelector((state) => state.online.isConnected);
  const isLoading = useSelector((state) => state.drinks.isLoading);
  const dispatch = useDispatch();
  const [filtersCategories, setFiltersCategories] = useState(filters);
  const [refreshFilters, setRefreshFilters] = useState(false);
  return (
    <SafeAreaView style={[styles.fullFlex, styles.centerContainer]}>
      <Indicator isShow={isLoading} />
      <ScrollView>
        {categories &&
          categories.length > 0 &&
          categories.map((category, i) => (
            <Pressable
              style={styles.listItemContainer}
              key={category + i}
              onPress={() => {
                setRefreshFilters(true);
                setFiltersCategories({
                  ...filtersCategories,
                  [category]: {
                    ...filtersCategories[category],
                    isSelected: !filtersCategories[category].isSelected,
                  },
                });
              }}>
              <View style={styles.listItemContentContainer}>
                <Text style={styles.listItemTitle}>{category}</Text>
                {filtersCategories[category].isSelected && (
                  <Image source={require('../images/check.png')} />
                )}
              </View>
            </Pressable>
          ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            if (isConnected) {
              dispatch(switchFilters(filtersCategories));
              setRefreshFilters(false);
            } else {
              dispatch(setStatusModal(true));
            }
          }}
          title={savedFilters && !refreshFilters ? 'Applied' : 'Apply'}
          color={colors.black}
        />
      </View>
    </SafeAreaView>
  );
};

export default FiltersList;
