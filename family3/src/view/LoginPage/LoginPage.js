import React, {Component} from 'react';
import {AppRegistry, Text ,View, StyleSheet, Button} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import DBHandler from '../../api/DBHandler'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import { Color } from '../../assets/Assets'
import { Config } from '../../assets/GoogleConfig'

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
		this.DBHandler = new DBHandler();
		this.GoogleAPIHandler = new GoogleAPIHandler();

		GoogleSignin.configure(Config);
		this.state = {
			isUserSignedIn: false,
			userData: {},
			checkingSignedInStatus: true
		};
	}
	  
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
							if (this.state.isUserSignedIn){
								this.handleAcount();
								this.props.navigation.navigate('Home', {userData: this.state.userData});
							}
						})
					}}
				/>
			</View>
		);
	}

	async handleAcount() {
		if (!await this.DBHandler.hasAccount(this.state.userData.idToken)){
			token = await GoogleSignin.getTokens();
			const album = await this.GoogleAPIHandler.makeAlbum("Family3", token)
			const response = await this.DBHandler.createAccount(album.id)
			if (response.data != null){
				console.log('Account Creation Success')
			}
		}
	}

	async googleSignInHandler() {
		console.log("Signing in...");
		try {
			await GoogleSignin.hasPlayServices();
			const userData = await GoogleSignin.signIn();
			this.setState({
				userData,
				isUserSignedIn: true,
			});
			console.log("Signed In");
			console.log(userData);
		} catch (error) {
			console.log(error);
		}
	};

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