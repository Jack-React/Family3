import {createStackNavigator} from 'react-navigation-stack';


import UploadPage from '../../page/UploadPage/UploadPage';
import PreviewComponent from '../../page/UploadPage/component/PreviewComponent'
import PreviewPage from '../../page/UploadPage/PreviewPage';
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
            screen:PreviewPage,
            navigationOptions:{
                header: null
            }
        },
        
        SingleImagePreview: {
            screen: PreviewComponent,
            navigationOptions:{
                header: null
            }
        }
    },
    {  
        initialRouteName: 'Upload',
    }
)


