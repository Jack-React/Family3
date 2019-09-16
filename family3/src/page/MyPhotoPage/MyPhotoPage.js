import React, {Component} from 'react'
import{ View, StyleSheet, StatusBar, Text, Image, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';


import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import { Color } from '../../assets/Assets'
import NoImageComponent from './component/NoImageComponent';

const IMAGE_WIDTH = Dimensions.get('window').width
export default class MyPhotoPage extends Component {
    constructor(){
        super();
        this.GoogleAPIHandler = new GoogleAPIHandler();
        this.state = {
            images: {},
            loaded: false,
            spinner: true,
            numColumns: 3
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
        this.setState({images: response, loaded: true, spinner: false})
    }

    render() {
        const {images, numColumns} = this.state;
        if (this.state.loaded){
            if (JSON.stringify(images) != '{}'){
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
                        <SafeAreaView style = {{flex: 1, alignItems: 'center'}}>
                            <FlatList
                                numColumns = {numColumns}
                                data = {images}
                                renderItem = {({item, index}) => {
                                    return(
                                        <TouchableOpacity
                                        activeOpacity= {0.5}
                                        underlayColor= {Color.GREY}
                                        onPress={() => {this.loadImage(index)}}>
                                            <View style = {{ alignItems: 'center', paddingBottom: 2, paddingLeft: 2, paddingRight: 2}}>
                                                <Image source={{uri: item.baseUrl}}
                                                    style={{width: IMAGE_WIDTH/this.state.numColumns - 6, height: IMAGE_WIDTH/this.state.numColumns - 6}}/>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                                keyExtractor = {item => item.id} 
                            />
                        </SafeAreaView>
                    </View>
                )
            }
            else {
                return <NoImageComponent/>
            }
        }
        else {
            return (
                <View style = {styles.MainContainer}>
                    <Spinner visible={this.state.spinner} />
                </View>
            )
        }
    }
    
    loadImage(index){
        this.props.navigation.navigate(('ImageSwiper'), {index: index, images: this.state.images})
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
    }
})