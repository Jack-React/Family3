import React, {Component} from 'react';
import {AppRegistry, Text ,View, StyleSheet, Button} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import { Color } from '../assets/Assets'

export default class LoginPage extends Component {
	static navigationOptions = {
		title: "Login",
		headerStyle: {
			backgroundColor: Color.PRIMARY,
			elevation: 0,
			shadowOpacity: 0,
			textAlign:"center",
			flex:1 
		},
		headerTitleStyle: { color: Color.SECONDARY },
	}
	constructor(props){
		super(props);

		GoogleSignin.configure({
			scopes: ["https://www.googleapis.com/auth/drive.photos.readonly"],
			webClientId:'151347594039-95vbncamplm3brr71hga2q53el0qf7at.apps.googleusercontent.com',
			forceConsentPrompt: true
		});
		this.state = {
			isUserSignedIn: false,
			userData: {},
			checkingSignedInStatus: true
		};
	}
	
	googleSignInHandler = async () => {
		console.log("Signing in...");
		try {
			await GoogleSignin.hasPlayServices();
			const userData = await GoogleSignin.signIn();
			this.setState({
				userData,
				isUserSignedIn: true,
			});
			console.log("Signed In");
		} catch (error) {
			console.log(error);
		}
	};


	  
	render(){
		return (
			<View style = {styles.MainContainer}>
				<Text style = {styles.Header}>Family3</Text>
				
				<GoogleSigninButton 
					style={{ width: 142, height: 48}}
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Light}
					onPress={() => {
						this.googleSignInHandler()
						.then(() => {
							if (this.state.isUserSignedIn)
								this.props.navigation.navigate('Home', {userData: this.state.userData});
						})
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Color.PRIMARY
	},
	Header: {
		color: Color.SECONDARY,
		fontSize: 24
	},

	bottomView:{
		width: '100%', 
		height: 50, 
		backgroundColor: Color.PRIMARY, 
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
	},
});

AppRegistry.registerComponent("LoginPage", () => LoginPage);