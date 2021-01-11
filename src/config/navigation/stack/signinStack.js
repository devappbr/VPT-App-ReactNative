import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screen/user/login';
import SignUp from '../screen/user/signUp';
import ForgotPass from '../screen/user/forgotpass';

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { header: null } },
    SignUp: { screen: SignUp },
    ForgotPass: { screen: ForgotPass },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AuthStack);
