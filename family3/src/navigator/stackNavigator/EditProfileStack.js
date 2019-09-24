import {createStackNavigator} from 'react-navigation-stack';


import EditProfilePage from '../../page/ProfilePage/EditProfilePage';
//import PreviewComponent from '../../page/ProfilePage/component/PreviewComponent'
import { Color } from '../../assets/Assets';


export default EditProfileStack = createStackNavigator(
    {
        EditProfile: {
            screen: EditProfilePage,
            navigationOptions:{
                header: null
            }
        }
    },
    {  
        initialRouteName: 'EditProfile',
    }
)


