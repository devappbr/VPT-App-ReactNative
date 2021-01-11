import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  fullWidth: width,
  fullHeight: height,
  isIOS: Platform.OS === 'ios',
  padding: 18,
  ...Platform.select({
    ios: { headerHeight: 62, headerPadding: 0 },
    android: { headerHeight: 62, headerPadding: 0 },
  }),
  tabBarHeight: 50,
};
