import React, {Component} from 'react';
import{ View, Text, StyleSheet, StatusBar} from 'react-native';
import { Button } from 'react-native-elements';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { GoogleSignin } from 'react-native-google-signin';

import { Color } from '../../assets/Assets'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import APIHandler from '../../api/APIHandler'
import DBHandler from '../../api/DBHandler'


export default class UploadPage extends Component {
    constructor() { 
        super();
        this.state = {
            images: null,
            image: null
        }

        this.GoogleAPIHandler = new GoogleAPIHandler()
        this.APIHandler = new APIHandler()
        this.DBHandler = new DBHandler()
    }
    render(){
        return (
            <View style = {styles.MainContainer}>
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor = {Color.STATUS_BAR}
                        barStyle = 'dark-content'
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
                        <Title style = {{color:Color.SECONDARY}}>Upload</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                    <Text style = {{color: Color.SECONDARY}}>
                        Upload an Image!
                    </Text>
                </View> 
                <View style = {styles.bottomView}>
                    <Button 
                        title = "Open Gallery"
                        type="clear"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: 200}}
                        onPress = {() => {
                            this.handleGallery();
                    }}/>
                    <Button 
                        title = "Open Camera"
                        type="clear"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: 200}}
                        onPress = {() => {
                            this.handleCamera();
                    }}/>
                </View>
            </View>


        )
    }

    async submitImages(){
        token = await GoogleSignin.getTokens();
        if (this.state.images != null){
            console.log(this.state.images.length)
            for (i = 0; i < (this.state.images.length) ; i ++){
                uploadToken = await this.GoogleAPIHandler.getUploadToken(this.state.images[i], token)
                this.GoogleAPIHandler.submitImage(uploadToken, "Test", token);
                console.log("Image Submitted");
            }
            this.setState({images: null})
        }
        if (this.state.image != null) {
            uploadToken = await this.GoogleAPIHandler.getUploadToken(this.state.image, token)
            this.GoogleAPIHandler.submitImage(uploadToken, "Test", token);
            this.setState({image: null})
            console.log("Image Submitted");
        }
    }

    async handleGallery(){
        console.log("Choosing Photo from gallery...");
        try {
            const images = await ImagePicker.openPicker({ multiple: true})
            this.setState({images}, () => {this.submitImages()});
        }
        catch (error) {
            console.warn(error)
        }
    }
    async handleCamera(){
        console.log("Choosing Photo from camera...");
        try {
            const image =  await ImagePicker.openCamera({
                                width: 300,
                                height: 400,
                                // cropping: true,
                            })
            this.setState({image}, () => {this.submitImages()});
        }
        catch (error) {
            console.warn(error)
        }
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
        backgroundColor: Color.PRIMARY
    },

    bottomView:{
		width: '100%', 
        height: 50, 
        flexDirection: 'row',
		backgroundColor: Color.PRIMARY,
		justifyContent: 'space-evenly', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
    },

    Text: {
        color: Color.SECONDARY,
    },
});
