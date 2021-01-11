import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthOrApp from '../authOrApp'
import MainStack from '../stack/mainStack'
import Signin from '../../../screens/signin'

const SwitchNavigator = createSwitchNavigator(
    {
      AuthOrApp: { screen: AuthOrApp },
      Signin: { screen: Signin },
      MainStack: { screen: MainStack },
    },
    {
      initialRouteName: 'AuthOrApp',
    },
  );
  
  export default createAppContainer(SwitchNavigator);
  