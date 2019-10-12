import {createStackNavigator} from 'react-navigation-stack';

import MyPhotoPage from '../../page/MyPhotoPage/MyPhotoPage';

export default MyPhotoStack = createStackNavigator(
    {
        Photo: {
            screen: MyPhotoPage,
            navigationOptions:{
                header: null
            }
        }
    },
    {  
        initialRouteName: 'Photo',
    }
)

