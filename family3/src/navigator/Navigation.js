import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import DrawerIcon from 'react-native-vector-icons/AntDesign';

import { Color } from '../assets/Assets'

// Pages
import SplashScreen from '../page/SplashScren/SplashScreen';
import SettingsPage from '../page/SettingsPage/SettingsPage'; 

// Navigation Stacks
import UploadStack from './stackNavigator/UploadStack'
import HomeStack from './stackNavigator/HomeStack';
import AuthStack from './stackNavigator/AuthStack';
import MyPhotoStack from './stackNavigator/MyPhotoStack'
import AlbumStack from './stackNavigator/AlbumStack'
import ProfileStack from './stackNavigator/ProfileStack'

const DrawerComponent = props => (
    <ScrollView style = {{flex: 1}}>
        <View style = {styles.DrawerHeader}>
            <Image source ={require('../assets/icon/icon.png')} style = {styles.iconStyle}/>
        </View>
        <View>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
);


const AppTabNavigator = createBottomTabNavigator(
    {
        // Home: {
        //     screen: HomeStack,
        //     navigationOptions: () => 
        //     ({ tabBarIcon: ( <DrawerIcon name="home" size={20} color= {Color.SECONDARY}/>) }) 
        //     // {
        //     //     tabBarLabel: 'home'
        //     // }
        // },

        Profile:{
            screen: ProfileStack,
            navigationOptions: () => 
            ({ tabBarIcon: ( <DrawerIcon name="user" size={20} color= {Color.SECONDARY}/>) }) 
        },

        // Upload: {
        //     screen: UploadStack,
        //     navigationOptions: () => 
        //     ({ tabBarIcon: ( <DrawerIcon name="upload" size={20} color= {Color.SECONDARY} />) }) 
        // },

        Album: {
            screen: AlbumStack,
            navigationOptions: () => ({
                title: 'My Albums',
                tabBarIcon: ( <DrawerIcon name="picture" size={20} color= {Color.SECONDARY} />)
            }) 
        },

        // Settings: {
        //     screen: SettingsPage,
        //     navigationOptions: () => 
        //     ({ tabBarIcon: ( <DrawerIcon name="setting" size={20} color= {Color.SECONDARY}/>) }) 
        // }
    },
    {   
        initialRouteName: 'Profile',
        tabBarOptions: {
            activeTintColor: Color.SECONDARY,
            inactiveTintColor: 'gray',
        },
    }
)


const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: () => 
            ({ drawerIcon: ( <DrawerIcon name="home" size={20} color= {Color.SECONDARY}/>) }) 
        },

        // Profile:{
        //     screen: ProfilePage,
        //     navigationOptions: () => 
        //     ({ drawerIcon: ( <DrawerIcon name="user" size={20} color= {Color.SECONDARY}/>) }) 
        // },

        Upload: {
            screen: UploadStack,
            navigationOptions: () => 
            ({ drawerIcon: ( <DrawerIcon name="upload" size={20} color= {Color.SECONDARY} />) }) 
        },

        Photo: {
            screen: MyPhotoStack,
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
            activeTintColor: Color.SECONDARY,
            iconContainerStyle: {
                opacity: 1,
                color: Color.PRIMARY
            }
        }
    }
)

export default createAppContainer(
    createSwitchNavigator(
        {
            Splash: SplashScreen,
            Auth: AuthStack,
            App: AppTabNavigator
        },  
    )
)

const styles = StyleSheet.create({
    DrawerHeader: {
        height: 150,
        backgroundColor: Color.SECONDARY,
        justifyContent: "center",
        alignItems: "center"
    },

    iconStyle: {
        width: 100, 
        height: 100
    }
})