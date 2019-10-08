import React, {Component} from 'react'
import{ View, StyleSheet, StatusBar, Text, Image, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageView from 'react-native-image-view';

// import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import { Color } from '../../assets/Assets'
// import NoImageComponent from './component/NoImageComponent';

const IMAGE_WIDTH = Dimensions.get('window').width

export default class PreviewPage extends Component {
    constructor(){
        super();
        // this.GoogleAPIHandler = new GoogleAPIHandler();
        this.state = {
            // images: {},
            // loaded: false,
            // spinner: true,
            numColumns: 3,
            loadSingleImage: false,
            currentIndex: 0
        }
       
    }

    // async componentDidMount(){
    //     setInterval(() => {
    //         this.setState({
    //             spinner: false
    //         });
    //     }, 3000);
    //     token = await GoogleSignin.getTokens();
    //     const response = await this.GoogleAPIHandler.getMediaItems(token)
    //     const images = this.prepareImages(response);
    //     this.setState({ images: images, loaded: true, spinner: false})
    // }

    render() {
        const images = this.props.navigation.getParam('images')
        const { numColumns } = this.state;
        console.log(images)
        return (
                <View style={styles.MainContainer}>
                    <SafeAreaView style = {{flex: 1, alignItems: 'center'}}>
                        <FlatList
                            numColumns = {numColumns}
                            data = {images}
                            renderItem = {({item, index}) => {
                                return(
                                    <TouchableOpacity
                                    activeOpacity= {0.5}
                                    underlayColor= {Color.GREY}
                                    onPress={() => {this.props.navigation.navigate('SingleImagePreview', {images, index})}}>
                                        <View style = {{ alignItems: 'center', paddingBottom: 2, paddingLeft: 2, paddingRight: 2}}>
                                            <Image source={{uri: item.path}}
                                                style={{width: IMAGE_WIDTH/this.state.numColumns - 6, height: IMAGE_WIDTH/this.state.numColumns - 6}}/>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={item => item.path} 
                        />
                            
                    </SafeAreaView>
                </View>
            )
        }

    async handleSubmit(){
        await this.submitImages()
        this.setState({isSubmitting:false})
        this.props.navigation.goBack()
    }

    async submitImages(){
        token = await GoogleSignin.getTokens();
        description = 'test'
        for (i = 0; i < (this.state.count) ; i ++){
            uploadToken = await this.GoogleAPIHandler.getUploadToken(this.state.images[i], token)
            this.GoogleAPIHandler.submitImage(uploadToken, description, token);
        }
        console.log("Image Submitted");
    }         

    // This function converts the output from google api to something that imageViewer can understand
    prepareImages(images){
        const imageList = []

        // Return if empty
        if (JSON.stringify(images) == "{}"){
            return imageList;
        }

        // Else convert
        for (i = 0; i < images.length; i ++){
            output = {
                source: { uri: images[i].baseUrl },
                id: images[i].id,
                title: images[i].description,
                width: parseInt(images[i].mediaMetadata.width, 10),
                height: parseInt(images[i].mediaMetadata.height, 10)
            }
            imageList.push(output);
        }
        return imageList
    }
    
    // Refresh the images
    refreshPage(){
        this.setState({
            images: {},
            loaded: false,
            spinner: true,
            numColumns: 3
        })
        this.componentDidMount();
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

    singleImageFooter: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    singleImageText: {
        color: Color.PRIMARY,
        paddingBottom: 10
    }
})