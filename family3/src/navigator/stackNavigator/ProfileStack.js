import {createStackNavigator} from 'react-navigation-stack';

import AddMemberPage from '../../page/ProfilePage/AddMemberPage';
import ProfilePage from '../../page/ProfilePage/ProfilePage';

export default ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: ProfilePage,
            navigationOptions:{
                header: null
            }
        },

        AddMember: {
            screen: AddMemberPage,
            navigationOptions:{
                header: null
            }
        }
    },
    {  
        initialRouteName: 'Profile',
    }
)

