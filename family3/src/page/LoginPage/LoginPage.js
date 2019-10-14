import React, {Component} from 'react';
import { Text ,View, StyleSheet, StatusBar, Image} from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';

import DBHandler from '../../api/DBHandler'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import { Color } from '../../assets/Assets'

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
		this.DBHandler = DBHandler.getInstance();
		this.GoogleAPIHandler = GoogleAPIHandler.getInstance();
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
		const userData = await this.GoogleAPIHandler.googleSignInHandler()
		console.log(userData)
		this.setState({ userData: userData, isUserSignedIn: true });
		if (this.state.isUserSignedIn){
			if (await this.DBHandler.hasAccount(userData.idToken)){
				this.props.navigation.navigate('App', {userData: userData});
			}
			else
				this.props.navigation.navigate('Signup', {userData: userData});
		}
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
	iconStyle: {
        width: 80, 
        height: 80,
    },
});
