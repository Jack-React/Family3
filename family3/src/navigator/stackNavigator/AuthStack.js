import {createStackNavigator} from 'react-navigation-stack';

import LoginPage from '../../page/LoginPage/LoginPage';
import SignupPage from '../../page/SignupPage/SignupPage';

import {Color} from '../../assets/Assets';

export default AuthStack = createStackNavigator(
    {
        Login: LoginPage,

        Signup: {
            screen: SignupPage,
            navigationOptions:{
                title: "Sign Up",
                headerTintColor: Color.PRIMARY,
                headerStyle: {

                    backgroundColor: Color.SECONDARY,
                },
            }
        }
    },
    {
        initialRouteName: 'Login'
    }
)

