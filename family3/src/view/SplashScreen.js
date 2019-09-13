import React, { Component } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { View, Text, StyleSheet } from 'react-native';
import { Color }  from '../assets/Assets'


export default class SplashScreen extends Component {
    static navigationOptions = {
        headerTransparent: true,
    }

    constructor(){
        super();
        this.state = {
            curentUser: null,
            isSignedIn: false
        };
    }    
        
    componentDidMount() {
        // Spend some time on the splash screen
        setTimeout(() => {
            this.checkAuthentication()
        }, 0);
    }
    
    render(){
        return (
            <View style = {styles.mainContainer}>
                <Text style = {{color: Color.SECONDARY}}> Splash Screen </Text>
                <Text style = {{color: Color.SECONDARY}} >App Icon Goes Here</Text>
                {/* <Image Source = 'ADD APP ICON HERE'> */}
            </View>
        )
    }

    // Checks if user has logged into google
    checkAuthentication = async () => {
        console.log("Checking Log In Status...")
        const isSignedIn = await GoogleSignin.isSignedIn();
        
        if (isSignedIn){
            const currentUser = await this.getCurrentUser();
            this.setState({ currentUser: currentUser, isSignedIn: true });
            this.props.navigation.navigate('Home', {userData: currentUser})
        }
        else 
            this.props.navigation.navigate('Auth')
        
    };
    
    // Gets the data of the user
    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        return currentUser;
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY
    },
})