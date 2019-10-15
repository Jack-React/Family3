import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';

import { Color }  from '../../assets/Assets';
import DBHandler from '../../api/DBHandler';
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
export default class SplashScreen extends Component {
    static navigationOptions = {
        headerTransparent: true,
    }

    constructor(){
        super()
        this.DBHandler = DBHandler.getInstance()
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance()
    }

    componentDidMount() {
        // Spend some time on the splash screen
        // await this.checkAuthentication()
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

    // Checks if user has logged into google and has an account in the databse 
    async checkAuthentication() {
        console.log("Checking Log In Status...")
        const isGoogleSignedIn = await this.GoogleAPIHandler.isSignedIn();

        if (isGoogleSignedIn){
            const isDBSignedIn = await this.DBHandler.hasAccount();

            if (isDBSignedIn){
                this.props.navigation.navigate('App')
            }
            else 
                this.props.navigation.navigate('Auth')
        }
        else 
            this.props.navigation.navigate('Auth')
    };

    // Checks if the user has any unjoined family albums
    // checkAlbums(){
    //     DBHandler.get
    // }

    // // Joins all family shared albums
    // async joinAlbums(sharedTokens){
    //     for (i = 0; i < sharedTokens.length; i ++)
    //         await this.GoogleAPIHandler.joinSharedAlbum(sharedTokens[i])
    // }
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