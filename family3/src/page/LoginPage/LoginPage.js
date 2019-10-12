import React, {Component} from 'react';
import { Text ,View, StyleSheet, StatusBar, Image} from 'react-native';
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
				<StatusBar
					backgroundColor={Color.STATUS_BAR}
					barStyle="light-content"
				/>
				<Image source ={require('../../assets/icon/icon.png')} style = {styles.iconStyle}/>
				<Text style = {styles.Header}>Family3</Text>
				
				<GoogleSigninButton 
					style={{ width: 142, height: 48}}
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Light}
					onPress={() => {
						this.handleSignIn()
					}}
				/>
			</View>
		);
	}
	
	/* Checks if the user has an account in database. Navigate to home page if true, signup page otherwise */
	async handleSignIn(){
		await this.googleSignInHandler()
		if (this.state.isUserSignedIn){
			if (await this.DBHandler.hasAccount(this.state.userData.idToken)){
				this.props.navigation.navigate('App', {userData: this.state.userData});
			}
			else
				this.props.navigation.navigate('Signup', {userData: this.state.userData});
			
			
		}
	}

	/* Function to sign in using google account */
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
		} catch (error) {
			console.warn(error);
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
	iconStyle: {
        width: 80, 
        height: 80,
    },
});
