import React, {Component} from 'react'
import{ View, Text, StyleSheet, StatusBar, Image, TextInput, AsyncStorage} from 'react-native';
import { Header, Left, Right, Button , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import DBHandler from '../../api/DBHandler'


import { Color } from '../../assets/Assets'

// * There are 2 sample data for you to test your code
// This is a data get from database with full details
const sampleData1 = {
    _id: "108847325318354420000",
    create_date: "2019-10-13T14:37:49.968Z",
    firstName: "Xun",
    lastName: "Zhang",
    email: "zhangxunsnail@gmail.com",
    family: "5d89a94281b02708c8e0e24c",
    __v: 0,
    DOB: "1998-09-08T00:00:00.000Z",
    gender: "Female"
}

export default class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            googleUserData: null,
            userData: null
    }; 

    this.GoogleAPIHandler = new GoogleAPIHandler()
        this.DBHandler = new DBHandler()
    }
    async componentDidMount(){
        const googleUserData = await GoogleSignin.getCurrentUser()
        //this.setState({ userData });
        this.setState({
	    // set googleUserData as null to test 
            googleUserData: googleUserData,
            userData: sampleData1
        });
    }

    render() {
	 // if using virtual account from database 
        // iterate through JSON object
        // and populate a JSON array
        if (this.state.googleUserData == null){
            var obj = this.state.userData;
            var array = Array(9);
            var i = 0;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var val = obj[key];
                    //array.push(val);
                    array.splice(i, 0, val);
                    i += 1;
                    console.log(val);
  }
}
           
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
		    
                {/* set blank profile pic */}
                <View style = {styles.avatarContainer}>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={require('../../assets/Image/NoProfilePic.png')} 
                        activeOpacity={0.7}
                        />
                </View>
                

            <View style = {styles.contentContainer}>
                    
                {/* display first name, last name and email */}
                <Text style = {{color: Color.SECONDARY}}>{array[2]}</Text>
                <Text style = {{color: Color.SECONDARY}}>{array[3]}</Text>
                <Text style = {{color: Color.SECONDARY}}>{array[4]}</Text>
                            
                </View>
            </View>
            )
        }

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
                
                
                <View style = {styles.avatarContainer}>
                {/* display google profile pic */}
                <Avatar
                size="xlarge"
                rounded
                source={{uri: this.state.googleUserData.user.photo}} 
                activeOpacity={0.7}
                />
                
                </View>
                
                <View style = {styles.contentContainer}>
                    
                    {/* if signed in through google, display google account credentials
                    otherwise display credentials from database  */}
                    <Text style = {{color: Color.SECONDARY}}> {this.state.googleUserData.user.givenName}</Text>
                    <Text style = {{color: Color.SECONDARY}}>{this.state.googleUserData.user.familyName}</Text> 
                    <Text style = {{color: Color.SECONDARY}}>{this.state.googleUserData.user.email}</Text>
                                 
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },

    avatarContainer: {
        position: 'absolute',
        top: 100,
        left: 100,
        right: 0
    },

    buttonContainer: {
                flex: 1,
                position: 'relative',
                top: 80,
                left: 200,
                paddingLeft: 100
            },
        
})
