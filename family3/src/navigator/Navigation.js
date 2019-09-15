import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { Color } from '../assets/Assets'
import LoginPage from '../view/LoginPage/LoginPage';
import HomePage from '../view/HomePage/HomePage';
import UploadPage from '../view/UploadPage/UploadPage';
import SplashScreen from '../view/SplashScreen';
import MyPhotoPage from '../view/MyPhotoPage/MyPhotoPage';
import SettingsPage from '../view/SettingsPage/SettingsPage'; 
import ProfilePage from '../view/ProfilePage/ProfilePage';


const DrawerComponent = props => (
    <ScrollView style = {{flex: 1}}>
        <View style = {styles.DrawerHeader}>
            <Text style = {{color: Color.SECONDARY}}>App Icon Goes here</Text>
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
        Home: HomePage,
        Profile:ProfilePage,
        Upload: UploadPage,
        Photo: {
            screen: MyPhotoPage,
            navigationOptions: () => 
            ({
                title: 'My Photos',
            }) 
        },
        Settings: SettingsPage,
        
    }, 
    {
        drawerBackgroundColor: Color.PRIMARY,
        contentComponent: props => <DrawerComponent {...props} />,
        contentOptions: {
            inactiveTintColor: Color.SECONDARY,
            activeTintColor: Color.DRAWER_TINT
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
    }
})