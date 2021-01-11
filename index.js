/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import SwitchStack from './src/config/navigation/switch'
import { YellowBox } from 'react-native'


YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
    'componentWillReceiveProps has been renamed', // TODO: Remove when fixed
    "The 'captureAudio' property set on RNCamera", // TODO: Remove when fixed
  ])
  

AppRegistry.registerComponent(appName, () => SwitchStack);
