import {createStackNavigator} from 'react-navigation-stack';

import LoginPage from '../../page/LoginPage/LoginPage';


export default AuthStack = createStackNavigator(
    {
        Login: LoginPage
    },
)

