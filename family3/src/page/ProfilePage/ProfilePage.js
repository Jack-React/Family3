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

// This is a fake data with the server format
const sampleData2 = {
    // Althogh there is an _id you don't need to show it
    _id: "testid",
    // Same, you don't need to show the create_date
    create_date: "2019-10-13T14:37:49.968Z",
    firstName: "First",
    lastName: "Last",
    // If there is lack of infomation in database
    // You will get "undefined" as result, just show it empty
    email: undefined,
    family: undefined,
    __v: 0,
    // This String is in type Date, research for how to deal with Date type or ask Jenpin
    DOB: "2000-01-01T00:00:00.000Z",    
    gender: "Male"
}

// * This is a sample data for contact pages
// Actually, it is just an array of userdata in the same family
// You can use this to test your front end when you work with contact page
const contactSampleData = [
    {
        _id: "07a6e943a89656b28e690756b00ee66134c3f54bda4b2164b48837062245051b",
        create_date: "2019-10-07T12:46:07.574Z",
        firstName: "Zhifu",
        lastName: "Zhang",
        DOB: "1937-07-20T00:00:00.000Z",
        gender: "Male",
        __v: 0,
        family: "5d89a94281b02708c8e0e24c"
    },
    {
        _id: "108847325318354420000",
        create_date: "2019-10-13T14:37:49.968Z",
        firstName: "Xun",
        lastName: "Zhang",
        email: "zhangxunsnail@gmail.com",
        family: "5d89a94281b02708c8e0e24c",
        __v: 0,
        DOB: "1998-09-08T00:00:00.000Z",
        gender: "Female"
    },
    {
        _id: "597b0ddfe8e0bd240cc166f2f1ececb493cfda372865096fc84bb9ecbd362c55",
        create_date: "2019-10-07T12:41:05.406Z",
        firstName: "Xiaojian",
        lastName: "Zhang",
        DOB: "1963-05-12T00:00:00.000Z",
        gender: "Male",
        __v: 0,
        family: "5d89a94281b02708c8e0e24c"
    }
]

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
