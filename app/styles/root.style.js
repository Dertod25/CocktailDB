import {StyleSheet} from 'react-native';
import {metrics} from '../config/app.config';

export const fontSizes = {
  small: metrics.em(0.875),
  medium: metrics.em(1),
  large: metrics.em(1.2),
  exLarge: metrics.em(1.5),
};

export const colors = {
  darkblue: '#493e76',
  darkred: '#a73f59',
  transparent: 'rgba(0,0,0,0)',
  warning: '#dc3545',
  success: '#129f1b',
  gray: '#7E7E7E',
  black: '#272727',
};

export const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: fontSizes.exLarge,
    lineHeight: 28,
  },
  fullFlex: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  centerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listSectionTitle: {
    color: colors.gray,
    fontSize: fontSizes.small,
    lineHeight: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  listItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  listItemTextContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginLeft: 20,
    marginRight: 20,
  },
  listItemContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  listItemTitle: {
    color: colors.gray,
    fontSize: fontSizes.medium,
    lineHeight: 19,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 27,
    marginBottom: 15,
  },
  textLink: {
    color: colors.darkred,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContainer: {
    width: '100%',
    height: metrics.navBarHeight,
  },
  backgroundWarning: {backgroundColor: colors.warning},
  backgroundSuccess: {backgroundColor: colors.success},
  notificationText: {
    fontSize: fontSizes.medium,
    color: colors.darkblue,
    alignSelf: 'center',
  },
  m20: {
    margin: 20,
  },
});
