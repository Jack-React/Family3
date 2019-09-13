import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar, TouchableHighlight, ScrollView } from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import { GoogleSignin } from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';


import { Color } from '../assets/Assets'
import { Config } from '../assets/GoogleConfig'

export default class Settings extends Component {
    constructor(){
        super();
        this.state = {
            settingDialogVisible: false,
            isSignedOut: false,
            isRendered: false
        }
    }

    render() {
        this.checkSignedOut();
        return (
            <View style={styles.MainContainer}>
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor={Color.PRIMARY_DARK}
                        barStyle="light-content"
                    />
                    <Left>
                        <ButtonBase
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                            >
                            <Icon name="navicon" size={20} color= {Color.SECONDARY}/>
                        </ButtonBase>
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right />
                </Header>
                <Dialog
                    visible = {this.state.settingDialogVisible}
                    onTouchOutside = {() => { this.setState({ settingDialogVisible: false })}}
                    dialogTitle={<DialogTitle title="Log Out?" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                            text="Cancel"
                            onPress={() => {
                                this.setState({ settingDialogVisible: false })
                            }} />
                            <DialogButton
                            text="Confirm"
                            onPress={() => {
                                this.signOut()
                                this.setState({ settingDialogVisible: false, isSignedOut: true })
                            }} />
                        </DialogFooter>
                    }>
                    <DialogContent>
                        <Text>Are you sure you want to log out?</Text>
                    </DialogContent>
                </Dialog>
                <ScrollView>
                    <View style = {styles.contentContainer}>
                        <TouchableHighlight
                            style={styles.touchableButton}
                            activeOpacity= {0.5}
                            underlayColo= {Color.SECONDARY}
                            onPress={() => {this.setState({settingDialogVisible: true})}}>
                        <Text style = {styles.textStyle}> Log Out </Text>
                        </TouchableHighlight>
                    </View> 
                </ScrollView>
            </View>
        )
    }
    
    checkSignedOut(){
        if (this.state.isSignedOut){
            if (this.state.isRendered)
                this.props.navigation.navigate("Login")
            else   
                this.setState({isRendered: true})
        }

    }
    
    signOut = async () => {
        GoogleSignin.configure(Config);
        try {
            // await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
      };
} 

const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY
    },

    touchableButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        padding: 20,
        backgroundColor: Color.PRIMARY,
    },

    textStyle: {
        color: Color.SECONDARY,
        fontSize: 15
    }
})