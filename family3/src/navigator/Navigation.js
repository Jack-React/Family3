import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { View, Button, Text, ScrollView, StyleSheet } from 'react-native';

import { Color } from '../assets/Assets'
import LoginPage from '../view/LoginPage';
import HomePage from '../view/HomePage';
import UploadPage from '../view/UploadPage';
import SplashScreen from '../view/SplashScreen';
import MyPhotoPage from '../view/MyPhotoPage';
import SettingsPage from '../view/SettingsPage'; 

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
        Upload: UploadPage,
        Photo: {
            screen: MyPhotoPage,
            navigationOptions: () => 
            ({
                title: 'My Photo',
            }) 
        },
        Settings: SettingsPage
    }, 
    {
        drawerBackgroundColor: Color.PRIMARY,
        contentComponent: props => <DrawerComponent {...props} />,
        contentOptions: {
            inactiveTintColor: Color.SECONDARY
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