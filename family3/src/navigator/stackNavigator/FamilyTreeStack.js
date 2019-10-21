import {createStackNavigator} from 'react-navigation-stack';

import FamilyTreePage from '../../page/FamilyTreePage/FamilyTreePage';
import AddRelationshipPage from '../../page/FamilyTreePage/AddRelationshipsPage';

export default UploadStack = createStackNavigator(
    {
        FamilyTree: {
            screen: FamilyTreePage,
            navigationOptions:{
                header: null
            }
        },
        AddRelationship: {
            screen: AddRelationshipPage,
            navigationOptions: {
                header: null
            }
        }
    },
    {  
        initialRouteName: 'FamilyTree',
    }
)




