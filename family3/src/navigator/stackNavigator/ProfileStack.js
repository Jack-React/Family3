import {createStackNavigator} from 'react-navigation-stack';


import EditProfilePage from '../../page/ProfilePage/EditProfilePage';
import ProfilePage from '../../page/ProfilePage/ProfilePage';

//import PreviewComponent from '../../page/ProfilePage/component/PreviewComponent'
import { Color } from '../../assets/Assets';


export default EditProfileStack = createStackNavigator(
    {
        Profile: {
            screen: ProfilePage,
            navigationOptions:{
                header: null
            }
        },

        EditProfile: {
            screen: EditProfilePage,
            navigationOptions:{
                header: null
            }
        }
    },
    {  
        initialRouteName: 'Profile',
    }
)


