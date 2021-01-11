import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Main from '../../../screens/main';

const AppDrawer = createDrawerNavigator(
  {
    AppStack: { screen: AppStack },
    App: { screen: App },
    CameraScreen: { screen: metrics.isIOS ? CameraScreenIOS : CameraScreen },
    Withdrawal: { screen: Withdrawal },
    Stories: { screen: Stories },
    Indicated: { screen: Indicated },
    Balance: { screen: Balance },
    Store: { screen: Store },
    Transfer: { screen: Transfer },
    Profile: { screen: Profile },
    InsertAccount: { screen: InsertAccount },
    AuthOrApp: { screen: AuthOrApp },
    Help: { screen: Help },
    HelpAnswersQuestions: { screen: HelpAnswersQuestions },
  },
  {
    contentComponent: Drawer,
    drawerWidth: 300,
    drawerBackgroundColor: 'transparent',
  },
);

export default createAppContainer(AppDrawer);
