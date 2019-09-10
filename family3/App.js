import React, {Component} from 'react';
import {AppRegistry, Text ,View, StyleSheet, Button, StatusBar} from 'react-native';


import AppNavigator from './src/AppNavigator';

export default class App extends Component{
	constructor(props) {
		super(props);

   		this.state = {
			  count: 0,
		}
	}
	
	render(){

		return (
			// <View style = {styles.MainContainer}>
				// {/* <LoginPage navigate = {navigate}/> */}
			
				// <StatusBar
				// 	backgroundColor = "#35394A"
				// 	barStyle = "light-content"/>
				<AppNavigator style={{backgroundColor: "#35394A"}}/>
						
			// </View>
		);
	};

}
