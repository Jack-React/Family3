import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar, Image, TextInput} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import DBHandler from '../../api/DBHandler'
import { Color } from '../../assets/Assets'


export default class EditProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: {
                user: {
                    name: 'a',
                    lastName: '',
                    phoneNumber: '',
                    email: ''
                }
            }
    };
    this.GoogleAPIHandler = new GoogleAPIHandler()
        this.DBHandler = new DBHandler()
    }
    async componentDidMount(){
        const userData = await GoogleSignin.getCurrentUser()
        this.setState({ userData })
    }

    render() {
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
                            onPress={() => this.props.navigation.openDrawer()}
                            >
                            <Icon name="navicon" size={20} color= {Color.SECONDARY}/>
                        </ButtonBase>
                    </Left>
                    <Body>
                        <Title style = {{color:Color.SECONDARY}}>Edit Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.detailsContainer}>
                <TextInput
                style={{height:40}}
                placeholder="First name"
                value={this.state.userData.user.givenName}
                onChangeText={(value) => this.setState({firstName:value})}
                />

                <TextInput
                style={{height:40}}
                placeholder="Last name"
                value={this.state.userData.user.lastName}
                onChangeText={(value) => this.setState({lastName:value})}
                />

                <TextInput
                style={{height:40}}
                placeholder="Phone number"
                value={this.state.userData.user.phoneNumber}
                onChangeText={(value) => this.setState({phoneNumber:value})}
                />

                <TextInput
                style={{height:40}}
                placeholder="Email"
                value={this.state.userData.user.email}
                onChangeText={(value) => this.setState({email:value})}
                />
                
                <Text style={{padding: 10, fontSize:25}}>
                </Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <Button
                        title = "Save"
                        type="clear"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: 180}}
                        onPress = {() => this.props.navigation.navigate('Profile')}/>
                </View>

                <View style = {styles.avatarContainer}>
                <Avatar
                size="xlarge"
                rounded
                title={this.state.userData.user.givenName}
                showEditButton editButton={{ onPress: () => this.handleGallery()}}
                activeOpacity={0.7}
                
                />
                </View>
                
            </View>
        )
    }
    async handleGallery(){
        console.log("Choosing Photo from gallery...");
        try {
            const response = await ImagePicker.openPicker({ multiple: true})
            this.props.navigation.navigate(('Preview'), {images: response})
        }
        catch (error) {
            console.warn(error)
        }
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

    detailsContainer: {
         alignItems: 'flex-start',
         left: 20, 
         top: 200,
         justifyContent: 'space-between',
         flexDirection: 'column', 
         letterSpacing: 10,
         color: 'pink'
    },

    buttonContainer: {
        position: 'absolute',
        top: 80,
        left: 240,
        paddingLeft: 60
    },

    avatarContainer: {
        position: 'absolute',
        top: 100,
        left: 100,
        right: 70
    }
    
})