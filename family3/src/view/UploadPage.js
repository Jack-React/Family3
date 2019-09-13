import React, {Component} from 'react';
import{ View, Button, Text, StyleSheet, StatusBar} from 'react-native';
import CameraComponent from '../components/CameraComponent'
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

import { Color } from '../assets/Assets'




export default class UploadPage extends Component {
    constructor() { 
        super();
        this.state = {
            images: null
        }
    }
    render(){
        return (
            <View style = {styles.MainContainer}>
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor = {Color.PRIMARY_DARK}
                        barStyle = 'light-content'
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
                        <Title>Upload</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                    <Text>
                        This is the upload page
                    </Text>
                    <Button 
                    title = "Choose Photo"
                    onPress = {() => {
                        this.handleChoosePhoto();
                    }}/>
                    <Button 
                    title = "Make Album"
                    onPress = {() => {
                        this.makeAlbum();
                    }}/>
                </View> 
            </View>
        )
    }

    handleChoosePhoto(){
        console.log("Choosing Photo...");
        ImagePicker.openPicker({ multiple: true })
        .then(images => {
            this.setState({images});
        })
        .catch(err => {
            console.log(err)
        })

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
		backgroundColor: Color.PRIMARY,
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
    },

    Text: {
        color: Color.SECONDARY,
    }
    
});
