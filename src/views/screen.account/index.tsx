import {createStackNavigator} from 'react-navigation-stack';

import Login from './login';
import Forget from './forget';
import Register from './register';

const AccountStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Forget: {
      screen: Forget,
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: $color.wet_asphalt,
      },
      headerTintColor: $color.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default AccountStack;
