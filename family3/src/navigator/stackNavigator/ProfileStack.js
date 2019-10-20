import {createStackNavigator} from 'react-navigation-stack';


// import EditProfilePage from '../../page/ProfilePage/EditProfilePage';
import ProfilePage from '../../page/ProfilePage/ProfilePage';

//import PreviewComponent from '../../page/ProfilePage/component/PreviewComponent'
import { Color } from '../../assets/Assets';


export default ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: ProfilePage,
            navigationOptions:{
                header: null
            }
        },

        
    },
    {  
        initialRouteName: 'Profile',
    }
)


