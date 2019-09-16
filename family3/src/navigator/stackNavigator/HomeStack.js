import {createStackNavigator} from 'react-navigation-stack';

import HomePage from '../../page/HomePage/HomePage';

export default UploadStack = createStackNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions:{
                header: null
            }
        },
    },
    {  
        initialRouteName: 'Home',
    }
)


