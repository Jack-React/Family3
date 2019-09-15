import React, {Component} from 'react'
import{ View, StyleSheet, StatusBar} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';


import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import { Color } from '../../assets/Assets'
import ImageSwiperComponent from './component/ImageSwiperComponent';
import NoImageComponent from './component/NoImageComponent';

export default class MyPhotoPage extends Component {
    constructor(){
        super();
        this.GoogleAPIHandler = new GoogleAPIHandler();
        this.state = {
            images: {},
            size: 0,
            loaded: false,
            spinner: true
        }
       
    }

    async componentDidMount(){
        setInterval(() => {
            this.setState({
                spinner: false
            });
        }, 3000);
        token = await GoogleSignin.getTokens();
        const response = await this.GoogleAPIHandler.getMediaItems(token)
        this.setState({images: response, size: response.length, loaded: true, spinner: false})
        
    }

    render() {
        if (this.state.loaded){
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
                            <Title style = {{color:Color.SECONDARY}}>My Photos</Title>
                        </Body>
                        <Right />
                    </Header>
                    {(JSON.stringify(this.state.images) != '{}') ? 
                        <ImageSwiperComponent images={this.state.images} size={this.state.size}/>: <NoImageComponent/>}
                </View>
            )
        }
        else {
            return (
                <View style = {styles.MainContainer}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                </View>
            )
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

    imageStyle: {
        width: 400,
        height: 400,
    },

    spinnerTextStyle: {
        color: Color.SECONDARY
      },
})