import {createStackNavigator} from 'react-navigation-stack';

import AlbumPage from '../../page/AlbumPage/AlbumPage';
import SingleAlbumPage from '../../page/AlbumPage/SingleAlbumPage';
import UploadStack from './UploadStack'

export default AlbumStack = createStackNavigator(
    {
        Album: {
            screen: AlbumPage,
            navigationOptions:{
                header: null
            }
        },
        
        SingleAlbum: {
            screen: SingleAlbumPage,
            navigationOptions:{
                header: null
            }
        },
        Upload: {
            screen: UploadStack,
            navigationOptions:{
                header: null
            }
        }
    },
    {  
        initialRouteName: 'Album',
    }
)

