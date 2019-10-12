import React, {Component} from 'react';
import{ View, Text, StyleSheet, StatusBar} from 'react-native';
import { Button } from 'react-native-elements';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

import { Color } from '../../assets/Assets'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import DBHandler from '../../api/DBHandler'

export default class UploadPage extends Component {
    constructor() { 
        super();
        this.state = {
            images: null,
            image: null,
            imageSelected: false
        }
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance();
        this.DBHandler = DBHandler.getInstance()
    }


    render(){
        return (
            <View style = {styles.MainContainer}>
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor = {Color.STATUS_BAR}
                        barStyle = 'light-content' />
                    <Left>
                        <ButtonBase
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                            >
                            <Icon name="angle-left" size={20} color= {Color.PRIMARY}/>
                        </ButtonBase>
                    </Left>
                    <Body>
                        <Title style = {{color:Color.PRIMARY}}>Upload</Title>
                    </Body>
                    <Right />
                </Header>

                <View style = {styles.contentContainer}>
                    <Button 
                        title = "Gallery"
                        type="outline"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: 200}}
                        onPress = {() => {
                            this.handleGallery();
                    }}/>
                    <View style={{paddingBottom:10}}></View>
                    <Button 
                        title = "Camera"
                        type="outline"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: 200}}
                        onPress = {() => {
                            this.handleCamera();
                    }}/>
                </View> 
                <View style = {styles.bottomView}>
                    
                </View>
            </View>
        )
    }

    // Handles the event where user selectes photo throught gallery
    async handleGallery(){
        try {
            const response = await ImagePicker.openPicker({ multiple: true})
            this.props.navigation.navigate(('Preview'), {images: response, album: this.props.navigation.getParam('album')})
        }
        catch (error) {
            console.warn(error)
        }
    }

    // Handles the event where user selectes photo throught camera
    async handleCamera(){
        try {
            const response =  await ImagePicker.openCamera({
                                width: 400,
                                height: 400 })
            this.props.navigation.navigate(('Preview'), {images: [response], album: this.props.navigation.getParam('album')})
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
        backgroundColor: Color.SECONDARY
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
});
