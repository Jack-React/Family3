import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
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
import ProfileStack from './stackNavigator/ProfileStack';

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

const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: () => 
            ({ drawerIcon: ( <DrawerIcon name="home" size={20} color= {Color.SECONDARY}/>) }) 
        },

        Profile:{
            screen: ProfileStack,
            navigationOptions: () => 
            ({ drawerIcon: ( <DrawerIcon name="user" size={20} color= {Color.SECONDARY}/>) }) 
        },

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
            App: AppDrawerNavigator,
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