import React, {Component} from 'react';
import { StatusBar, View } from 'react-native';

import { Color } from './src/assets/Assets'
import Navigator from './src/navigator/Navigation'
export default class App extends Component{
	constructor(props) {
		super(props);

   		this.state = {
			  count: 0,
		}
		console.disableYellowBox = true;
	}
	
	render(){

		return (
			<View style ={{flex: 1}}>
				<Navigator/>
			</View>
			

		);
	};

}
