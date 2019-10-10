/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {RelationshipPage} from './src/page/RelationshipPage/RelationshipPage'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RelationshipPage);
