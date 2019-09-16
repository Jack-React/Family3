import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import DrawerIcon from 'react-native-vector-icons/AntDesign';


import { Color } from '../assets/Assets'
import LoginPage from '../view/LoginPage/LoginPage';
import HomePage from '../view/HomePage/HomePage';
import UploadPage from '../view/UploadPage/UploadPage';
import SplashScreen from '../view/SplashScreen';
import MyPhotoPage from '../view/MyPhotoPage/MyPhotoPage';
import SettingsPage from '../view/SettingsPage/SettingsPage'; 
import ProfilePage from '../view/ProfilePage/ProfilePage';

// import Logo from '../assets/icon/family3-icon.svg';

const DrawerComponent = props => (
    <ScrollView style = {{flex: 1}}>
        <View style = {styles.DrawerHeader}>
            {/* <Image source ={require('../assets/icon/family3-icon.svg')} style = {styles.iconStyle}/> */}
            {/* <SvgUri
                width="100%"
                height="100%"
                uri='../assets/icon/family3-icon.svg'
            /> */}
            {/* <Logo width={120} height={40} /> */}
            <Text style = {{color: Color.SECONDARY}}>App Logo Here</Text>
        </View>
        <View>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
);

const AuthStack = createStackNavigator(
    {
        Login: LoginPage
    },
    {  
        headerLayoutPreset: 'center'
    }
)

const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: () => 
            ({ drawerIcon: ( <DrawerIcon name="home" size={20} color= {Color.SECONDARY}/>) }) 
        },

        Profile:{
            screen: ProfilePage,
            navigationOptions: () => 
            ({ drawerIcon: ( <DrawerIcon name="user" size={20} color= {Color.SECONDARY}/>) }) 
        },

        Upload: {
            screen: UploadPage,
            navigationOptions: () => 
            ({ drawerIcon: ( <DrawerIcon name="upload" size={20} color= {Color.SECONDARY} />) }) 
        },

        Photo: {
            screen: MyPhotoPage,
            navigationOptions: () => ({
                title: 'My Photos',
                drawerIcon: ( <DrawerIcon name="picture" size={20} color= {Color.SECONDARY} />)
            }) 
        },

        Settings: {
            screen: SettingsPage,
            navigationOptions: () => 
            ({ drawerIcon: ( <DrawerIcon name="setting" size={20} color= {Color.SECONDARY}/>) }) 
        }
    }, 
    {
        drawerBackgroundColor: Color.PRIMARY,
        contentComponent: props => <DrawerComponent {...props} />,
        contentOptions: {
            inactiveTintColor: Color.SECONDARY,
            activeTintColor: Color.DRAWER_TINT,
            iconContainerStyle: {
                opacity: 1,
                color: Color.PRIMARY
              }
        }
    }
)

const AppSwitchNavigator = createSwitchNavigator(
    {
        Splash: SplashScreen,
        Auth: AuthStack,
        App: AppDrawerNavigator
    },  
)
export default createAppContainer(AppSwitchNavigator)


const styles = StyleSheet.create({
    DrawerHeader: {
        height: 150,
        backgroundColor: Color.PRIMARY,
        justifyContent: "center",
        alignItems: "center"
    },

    iconStyle: {
        height: 100,
        width: 100
    }
})