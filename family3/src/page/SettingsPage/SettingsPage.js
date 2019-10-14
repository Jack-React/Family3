import React, {Component} from 'react'
import{ View, Text, StyleSheet, StatusBar, TouchableHighlight, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { Header, Right, Body, Title } from 'native-base'
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';

import { Color } from '../../assets/Assets'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'

export default class Settings extends Component {
    constructor(){
        super();
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance()
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
                        backgroundColor={Color.STATUS_BAR}
                        barStyle="light-content"
                    />
                    <Body>
                        <Title style = {{paddingLeft: 20, color:Color.PRIMARY}}>Settings</Title>
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
                            underlayColor= {Color.GREY}
                            onPress={() => {this.setState({settingDialogVisible: true})}}>
                        <Text style = {styles.textStyle}> Log Out </Text>
                        </TouchableHighlight>
                    </View> 
                    <Divider style={styles.dividerStyle} />
                </ScrollView>
            </View>
        )
    }
    
    /* Check if the user has succesfully signed out */
    checkSignedOut(){
        if (this.state.isSignedOut){
            if (this.state.isRendered)
                this.props.navigation.navigate("Login")
            else   
                this.setState({isRendered: true})
        }
    }
    
    /* Sign out */
    async signOut(){
        await this.GoogleAPIHandler.signOut();
        this.setState({ settingDialogVisible: false, isSignedOut: true })
    };
} 

const styles = StyleSheet.create({
    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 2
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },

    touchableButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        padding: 20,
        backgroundColor: Color.PRIMARY,
    },

    textStyle: {
        color: Color.SECONDARY,
        fontSize: 15
    },

    dividerStyle: {
        backgroundColor: Color.GREY,
        height: 1
    }
})