import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar, Image, TextInput, AsyncStorage} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import DBHandler from '../../api/DBHandler'


import { Color } from '../../assets/Assets'

export default class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: null
    };
    this.GoogleAPIHandler = new GoogleAPIHandler()
        this.DBHandler = new DBHandler()
    }
    async componentDidMount(){
        const userData = await GoogleSignin.getCurrentUser()
        this.setState({ userData });
        
    }

    render() {
       
        if (this.state.userData == null){
            return (
                <View></View>
            )
        }
        
        return (

            <View style={styles.MainContainer}>
                
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor={Color.STATUS_BAR}
                        barStyle="dark-content"
                    />
                    <Left>
                        <ButtonBase
                            transparent
                            onPress={() => {this.props.navigation.openDrawer()}}
                            >
                            <Icon name="navicon" size={20} color= {Color.SECONDARY}/>
                        </ButtonBase>
                    </Left>
                    <Body>
                        <Title style = {{color:Color.SECONDARY}}>Profile</Title>
                    </Body>
                    <Right />
                </Header>
                

                <View style = {styles.avatarContainer}>
                <Avatar
                size="xlarge"
                rounded
                source={{uri: this.state.userData.user.photo}}
                
                //showEditButton editButton={{ onPress: () => //this.handleGallery()}}
                activeOpacity={0.7}
                
                />
                </View>
                
                <View style = {styles.contentContainer}>
                    <Text style = {{color: Color.SECONDARY}}>
                       
                    {this.state.userData.user.givenName} 
                    {" "}
                    {this.state.userData.user.familyName}
                    
                    {"\n"}
                    {"\n"}
                    {this.state.userData.user.email} 
                    </Text>                   
                </View>
                {/* <View style = {styles.buttonContainer}>
                    <Button
                        title = "Edit"
                        type="clear"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: 180}}
                        
                        onPress={() => this.props.navigation.navigate('EditProfile')}/>
                </View> */}

                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY,
        fontSize: 30
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 60
        
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY, 
        fontSize: 30
    },


    avatarContainer: {
        position: 'absolute',
        top: 100,
        left: 100,
        right: 0
    }
    
})
