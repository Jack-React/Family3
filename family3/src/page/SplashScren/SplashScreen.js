import React, { Component } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';

import { Color }  from '../../assets/Assets'

export default class SplashScreen extends Component {
    static navigationOptions = {
        headerTransparent: true,
    }

    componentDidMount() {
        // Spend some time on the splash screen
        setTimeout(() => {
            this.checkAuthentication()
        }, 2000);
    }
    
    render(){
        return (
            <View style = {styles.mainContainer}>   
                <StatusBar hidden />
       
                <View style = {styles.iconContainer}>
                    <Image source ={require('../../assets/icon/icon.png')} style = {styles.iconStyle}/>
                </View>
                <View style = {styles.textContainer}>
                    <Text style = {styles.textStyle} >Family3</Text>
                    <Text style = {styles.textStyle} >All Your Artifacts Under One Roof</Text>
                </View>
            </View>
        )
    }

    // Checks if user has logged into google
    async checkAuthentication() {
        console.log("Checking Log In Status...")
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn)
            this.props.navigation.navigate('App')
        else 
            this.props.navigation.navigate('Auth')
    };
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.SECONDARY
    },

    iconContainer:{
        alignItems: 'center',
        justifyContent: 'center'
    },

    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    },

    iconStyle: {
        width: 80, 
        height: 80,
    },

    textStyle:{
        color: Color.PRIMARY,
        fontSize:15
    }
})