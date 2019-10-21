import React, {Component} from 'react'
import{ View, Text, StyleSheet, StatusBar, Image, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import { Header, Left, Right, Button , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import {Avatar} from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import DBHandler from '../../api/DBHandler'

import SettingsDialog from './component/SettingsDialog';
import InvitationDialog from './component/InvitationDialog';

import { Color } from '../../assets/Assets'
import NoInvitationDialog from './component/NoInvitationDialog';

export default class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            googleUserData: null,
            showDialog: false,
            showAcceptInvitationDialog: false,
            invitation: null,
            showInvitationDiaog: false

        }; 
        this.GoogleAPIHandler = new GoogleAPIHandler()
        this.DBHandler = new DBHandler()
    }
    
    async componentDidMount(){
        const googleUserData = await GoogleSignin.getCurrentUser()
        const userData = await this.DBHandler.getDBUserData()
        if (userData.invitation != null){
            this.setState({invitation: userData.invitation})
        }
        this.setState({
            googleUserData: googleUserData,
        });
    }

    render() {
        if (this.state.googleUserData == null){
            return null
        }
        else{
            /* if user is logged in through google */
            return (
                <View style={styles.MainContainer}>
                    <Header style = {styles.headerContainer}>
                        <StatusBar
                            backgroundColor={Color.STATUS_BAR}
                            barStyle="light-content"
                        />
                        <Body>
                            <Title style = {{paddingLeft: 20, color:Color.PRIMARY}}>Profile</Title>       
                        </Body>
                        <Right />
                    </Header>
                    
                    <SettingsDialog
                        visible={this.state.showDialog}
                        disableDialog={this.disableDialog.bind(this)}
                        signOutApprovalRecieved={this.signOutApprovalRecieved.bind(this)}
                    />

                    <InvitationDialog
                        invitation = {this.state.invitation}
                        visible={this.state.showAcceptInvitationDialog}
                        disableDialog={this.disableDialog.bind(this)}
                        invitationApprovalRecieved={this.invitationApprovalRecieved.bind(this)}
                    />
                    

                    <NoInvitationDialog
                        visible={this.state.showInvitationDiaog}
                        disableDialog={this.disableDialog.bind(this)}
                    />

                    <View style = {styles.avatarContainer}>
                        <Avatar
                        size="large"
                        rounded
                        source={{uri: this.state.googleUserData.user.photo}} 
                        activeOpacity={0.7}
                        />
                        <Text style = {{color: 'white', fontSize:16, marginTop: 10 }}> {this.state.googleUserData.user.givenName}</Text>
                        <Text style = {{color: 'white', fontSize:12, margin:10, marginBottom: 30 }}>{this.state.googleUserData.user.email}</Text>
                    </View>
                    <View style = {{justifyContent: 'flex-start', flex : 1, backgroundColor: Color.GREY}}>
                        <View style = {styles.contentContainer}>
                            <TouchableOpacity
                                style={styles.touchableButton}
                                activeOpacity= {0.5}
                                underlayColor= {Color.GREY}
                                onPress={() => {this.props.navigation.navigate('AddMember')}}>
                            <Icon name="user-plus" size={20} color= {Color.SECONDARY}/>
                            <Text style = {{paddingLeft: 17}}> Add Family Member </Text>
                            </TouchableOpacity>
                            <Divider/>
                            <TouchableOpacity
                                style={styles.touchableButton}
                                activeOpacity= {0.5}
                                underlayColor= {Color.GREY}
                                onPress={() => {
                                    if (this.state.invitation != null){
                                        this.setState({showAcceptInvitationDialog: true})
                                    }
                                    else {
                                        this.setState({showInvitationDiaog: true})
                                    }
                                    }}>
                            <Icon name="envelope-o" size={20} color= {Color.SECONDARY}/>
                            {this.state.invitation == null? 
                            <Text style = {{paddingLeft: 17}}> Invitations </Text>
                            :
                            <Text style = {{fontWeight: 'bold', paddingLeft: 17}}> Invitations </Text>
                            }
                            </TouchableOpacity>
                            <Divider/>
                            <TouchableOpacity
                                style={styles.touchableButton}
                                activeOpacity= {0.5}
                                underlayColor= {Color.GREY}
                                onPress={() => {this.setState({showDialog: true})}}>
                            <Icon name="sign-out" size={20} color= {Color.SECONDARY}/>
                            <Text style = {{paddingLeft: 20}}> Log Out </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }
    // Disables the dialog
    disableDialog(){
        this.setState({
            showDialog: false,
            showAcceptInvitationDialog: false,
            showInvitationDiaog: false
        })
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
        this.props.navigation.navigate("Login")
    }

    // recieve confirmation
    signOutApprovalRecieved(){
        this.signOut()
    }

    invitationApprovalRecieved(approved){
        if (approved){
            this.DBHandler.acceptFamilyInvitation()
            this.setState({invitation: null})
        }
        else {
            this.DBHandler.declineFamilyInvitation()
            this.setState({invitation: null})
        }
    }

}

const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        marginTop: 10
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },

    avatarContainer: {
        paddingTop: 40,
        backgroundColor: Color.SECONDARY,
        alignItems: 'center'
    },

    buttonContainer: {
        flex: 1,
        position: 'relative',
        top: 80,
        left: 200,
        paddingLeft: 100
     },

    profileInfo: {
        backgroundColor: '#5199ad',
        borderWidth: 1, 
        borderRadius: 10,
        borderColor: '#5199ad',
        width: '60%',
        padding: 5,
        alignItems: 'stretch'
    },
    touchableButton: {
        // alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        padding: 20,
        backgroundColor: Color.PRIMARY,
        elevation: 5
    },
        
})

