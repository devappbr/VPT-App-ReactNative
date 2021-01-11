import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import App from '../../App';
// import CameraScreen from '../screen/qrcode/qrCode';
// import CameraScreenIOS from '../screen/qrcode/qrCodeIOS';
// import Withdrawal from '../screen/withdrawal';
// import Stories from '../screen/stories';
// import Indicated from '../screen/indicated';
// import Balance from '../screen/balance';
// import Store from '../screen/store';
// import Transfer from '../screen/transfer';
// import Profile from '../screen/user/profile';
// import InsertAccount from '../screen/user/profile/account/newAccount';
// import AuthOrApp from '../screen/user/authOrApp';
// import Help from '../screen/help';
// import HelpAnswersQuestions from '../screen/help/answersQuestions';
// import { metrics } from '../themes';

import Main from '../../../screens/main'
import StoresPerCategories from '../../../components/stores/storesPerCategories'
import ProductsMenu from '../../../components/products/productsMenu';
import ProductsPerCategories from '../../../components/products/productsPerCategories'
import QrCode from '../../../components/qrcode/'
import Products from '../../../screens/products/index'
import ModalUI from '../../../ui/modal'
import ProductsOrder from '../../../components/products/productsOrder'


const MainStack = createStackNavigator(
  {
    Main: { screen: Main},
    StoresPerCategories: {screen: StoresPerCategories},
    ProductsMenu: {screen: ProductsMenu},
    ProductsPerCategories: {screen: ProductsPerCategories},
    QrCode: {screen: QrCode},
    Products: {screen: Products},
    ModalUI: {screen: ModalUI},
    ProductsOrder: {screen: ProductsOrder}
    // Login: { screen: Login, navigationOptions: { header: null } },
    // CameraScreen: { screen: metrics.isIOS ? CameraScreenIOS : CameraScreen },
    // Withdrawal: { screen: Withdrawal },
    // Stories: { screen: Stories },
    // Indicated: { screen: Indicated },
    // Balance: { screen: Balance },
    // Store: { screen: Store },
    // Transfer: { screen: Transfer },
    // Profile: { screen: Profile },
    // InsertAccount: { screen: InsertAccount },
    // AuthOrApp: { screen: AuthOrApp },
    // Help: { screen: Help },
    // HelpAnswersQuestions: { screen: HelpAnswersQuestions },
  },
  {
    initialRouteName: 'Main',
  },
);

export default createAppContainer(MainStack);
