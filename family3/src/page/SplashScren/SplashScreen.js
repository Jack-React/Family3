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
        this.state = {
            userData: null
        }
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
                this.checkAlbums()
                this.props.navigation.navigate('App')
            }
            else 
                this.props.navigation.navigate('Auth')
        }
        else 
            this.props.navigation.navigate('Auth')
    };

    // Checks if the user has any unjoined family albums
    async checkAlbums(){
        const userData = await this.DBHandler.getDBUserData()
        this.setState({userData: userData})
        if(userData.family != undefined){
            // console.log(userData.family)
            const familyData = (await this.DBHandler.getFamilies(userData.family)).data
            // console.log(familyData)
            if (familyData.sharedAlbums != undefined){
                // console.log(familyData.sharedAlbums)
                if (familyData.sharedAlbums.length > 0){
                    // console.log(familyData.sharedAlbums)
                    console.log("Yes")
                    this.joinAlbums(familyData.sharedAlbums)
                }
            }
        }
    }

    // Check if album is in array or albums
    // indentifier for album = albumid
    // identifier for albums = id
    containsAlbum(album, albums) {
        if (albums == undefined){
            return false
        }
        for (i = 0; i < albums.length; i++) {
            if (albums[i].id === album.albumid) 
                return true;
        }
        return false;
    }

    // Joins all family shared albums
    async joinAlbums(sharedAlbums){
        const googleSharedAlbums = await this.GoogleAPIHandler.getSharedAlbums()
        console.log(googleSharedAlbums)
        for (i = 0; i < sharedAlbums.length; i ++){
            if (!this.containsAlbum(sharedAlbums[i], googleSharedAlbums.sharedAlbums)){
                console.log( await this.GoogleAPIHandler.joinSharedAlbum(sharedAlbums[i].sharedToken))
            }
        }
    }
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