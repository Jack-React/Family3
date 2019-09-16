import {createStackNavigator} from 'react-navigation-stack';


import UploadPage from '../../page/UploadPage/UploadPage';
import PreviewComponent from '../../page/UploadPage/component/PreviewComponent'
import { Color } from '../../assets/Assets';


export default UploadStack = createStackNavigator(
    {
        Upload: {
            screen: UploadPage,
            navigationOptions:{
                header: null
            }
        },
        Preview: {
            screen:PreviewComponent,
            navigationOptions:{
                title: 'Preview',
                headerTintColor:  Color.SECONDARY,
                headerTitleStyle: {color: Color.SECONDARY, fontSize: 18},
            }
        }
    },
    {  
        initialRouteName: 'Upload',
    }
)


