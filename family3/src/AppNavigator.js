import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'; // Version can be specified in package.json


import HomePage from './view/HomePage'
import LoginPage from './view/LoginPage';


const AppNavigator = createStackNavigator(
    {
        Home: { 
            screen: HomePage,
            navigationOptions: {
                headerLeft: null,
                headerTransparent: true,
                headerTitle: 'Home',
                headerTitleStyle: {
                    color:'white',
                    textAlign: "center",
                    flex: 1,
                }
            }
        },
        Login: { 
            screen: LoginPage,
            navigationOptions: {
                headerTransparent: true,
                headerTitle: 'Login',
                headerTitleStyle: {
                    color:'white',
                    textAlign: "center",
                    flex: 1,
                }
            }
        },
    },
    {
        initialRouteName: 'Login'
    }        
);

export default AppContainer = createAppContainer(AppNavigator);

