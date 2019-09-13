import React, {Component} from 'react';
import{ View, Button, Text, StyleSheet, BackHandler} from 'react-native';
import CameraComponent from '../components/CameraComponent'
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';


import { Color } from '../assets/Assets'

export default class UploadPage extends Component {
    static navigationOptions = function(props) {
        return{
            headerTransparent: true,
            headerLeft: <Button onPress = {() => 
                console.log(props.navigation.openDrawer())} title = '=' />
        }
    }
    
    constructor(props){
        super(props);
        this.closeCamera = this.closeCamera.bind(this);
        this.state = {
            cameraPressed: false,
        };
    }

    render(){
        if (this.state.cameraPressed){
            return (<CameraComponent action={this.closeCamera}/>);
        }
        return(
            <View style={styles.MainContainer}>
                <Header style = {styles.headerContainer}>
                    <Left>
                        <ButtonBase
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                            >
                            <Icon name="navicon" size={20} color={Color.SECONDARY} />
                        </ButtonBase>
                    </Left>
                    <Body>
                        <Title>Upload</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                    <Text style = {styles.Text}>Upload an Image</Text>
                </View>
                <View style = {styles.bottomView}>
                    <Button
                        title='Launch Camera'
                        onPress= {() => {this.launchCamera();}}
                    />
                </View>  
            </View>   
        )
    }

    launchCamera(){
        this.setState({
            cameraPressed: true
        });
    }
    closeCamera() {
        this.setState({
            cameraPressed: false
        });
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
