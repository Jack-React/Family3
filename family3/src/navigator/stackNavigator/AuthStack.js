import {createStackNavigator} from 'react-navigation-stack';

import LoginPage from '../../page/LoginPage/LoginPage';
import SignupPage from '../../page/SignupPage/SignupPage';

export default AuthStack = createStackNavigator(
    {
        Login: LoginPage,
        Signup: SignupPage
    },
    {
        initialRouteName: 'Login'
    }
)

