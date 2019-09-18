import {createStackNavigator} from 'react-navigation-stack';

import { Color } from '../../assets/Assets';
import MyPhotoPage from '../../page/MyPhotoPage/MyPhotoPage';
import ImageSwiperComponent from '../../page/MyPhotoPage/component/ImageSwiperComponent';
import NoImageComponent from '../../page/MyPhotoPage/component/NoImageComponent';

export default AuthStack = createStackNavigator(
    {
        Photo: {
            screen: MyPhotoPage,
            navigationOptions:{
                header: null
            }
        },
        
        ImageSwiper: {
            screen: ImageSwiperComponent,
            navigationOptions:{
                headerTintColor:  Color.SECONDARY,
            }
        }
    },
    {  
        initialRouteName: 'Photo',
    }
)

