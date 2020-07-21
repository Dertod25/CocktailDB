import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Pressable} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import DrinksList from './drinksList.container';
import ConnectionModal from '../components/connectionModal.component';
import Splash from '../components/splash.component';
import FiltersList from './filtersList.container';
import {forHorizontalModal} from '../helpers/horizontalTransition.helper';
import {setStatusConnection, setStatusModal} from '../redux/actions/online';
import {getDrinkCategories} from '../redux/actions/drinks';
import {styles} from '../styles/root.style';

const Stack = createStackNavigator();

function Root() {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.online.isConnected);
  const isSplash = useSelector((state) => state.drinks.isSplash);

  useEffect(() => {
    netInfo.details && dispatch(setStatusConnection(netInfo.isConnected));
  }, [netInfo]);

  useEffect(() => {
    isConnected
      ? dispatch(getDrinkCategories())
      : isConnected !== null && dispatch(setStatusModal(true));
  }, [isConnected]);

  return (
    <>
      <ConnectionModal />
      <NavigationContainer>
        <Stack.Navigator>
          {isSplash && (
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />
          )}
          <Stack.Screen
            name="DrinksList"
            component={DrinksList}
            options={({navigation}) => ({
              title: 'Drinks',
              headerTitleStyle: styles.headerTitleStyle,
              // eslint-disable-next-line react/display-name
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate('FiltersList')}>
                  <Image
                    style={styles.m20}
                    source={require('../images/filter.png')}
                  />
                </Pressable>
              ),
              gestureDirection: 'horizontal',
              cardStyleInterpolator: forHorizontalModal,
            })}
          />
          <Stack.Screen
            name="FiltersList"
            component={FiltersList}
            options={{
              title: 'Filters',
              headerTitleStyle: styles.headerTitleStyle,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: forHorizontalModal,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Root;
