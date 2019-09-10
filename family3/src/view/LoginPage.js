import React, {Component} from 'react';
import {AppRegistry, Text ,View, StyleSheet, Button} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class LoginPage extends Component {
	constructor(props){
		super(props);
		GoogleSignin.configure({
			scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
			webClientId:'151347594039-95vbncamplm3brr71hga2q53el0qf7at.apps.googleusercontent.com',
			forceConsentPrompt: true
		});
		state = {
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
			console.log(userData);
		} catch (error) {
			console.log("error found")
			console.log(error);
		}
	};

	render(){
		return (
			<View style = {styles.MainContainer}>
				<Text style = {styles.Header}>Family3</Text>
				
				<View style = {styles.bottomView}>
					<GoogleSigninButton 
						style={{ width: 142, height: 48}}
						size={GoogleSigninButton.Size.Standard}
						color={GoogleSigninButton.Color.Light}
						onPress={() => {
							this.googleSignInHandler()
							.then(() => {
								if (this.state.isUserSignedIn == true){
									this.props.navigation.navigate('Home', {userData: this.state.userData});
								}
							})
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#35394A',
	},
	Header: {
		color: 'white',
		fontSize: 26
	},

	bottomView:{
		width: '100%', 
		height: 50, 
		backgroundColor: '#35394A', 
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
	},
});

AppRegistry.registerComponent("LoginPage", () => LoginPage);