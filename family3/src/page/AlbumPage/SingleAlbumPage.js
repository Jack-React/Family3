import React, {Component} from 'react'
import{ View, StyleSheet, StatusBar, Text, Image, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Header, Left, Button as ButtonBase, Right, Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageView from 'react-native-image-view';

import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import { Color } from '../../assets/Assets'

const IMAGE_WIDTH = Dimensions.get('window').width

export default class SingleAlbumPage extends Component {
    constructor(){
        super();
        this.GoogleAPIHandler = new GoogleAPIHandler();
        this.state = {
            album: {},
            images: {},
            loaded: false,
            spinner: true,
            numColumns: 3,
            loadSingleImage: false,
            currentIndex: 0,
            hasImage: false
        }
    }

    async componentDidMount(){
        album = this.props.navigation.getParam('album')
        if (album.mediaItemsCount){
            const response = await this.GoogleAPIHandler.getMediaItems(album.id)
            const images = this.prepareImages(response);

            setInterval(() => {
                this.setState({
                    hasImage: true,
                    spinner: false,
                    album: album,
                    images: images,
                    loaded: true
                })
            }, 3000);
        }
        else {
            this.setState({ loaded: true, album: album, spinner: false})
        }
    }

    render() {
        const {album} = this.state
        const {images, numColumns, loadSingleImage, currentIndex} = this.state;
        if (this.state.loaded){
            return (
                <View style={styles.MainContainer}>
                    <Header style = {styles.headerContainer}>
                        <StatusBar
                            backgroundColor={Color.STATUS_BAR}
                            barStyle="light-content"
                        />
                        <Left>
                            <ButtonBase
                                transparent
                                onPress={() => this.props.navigation.goBack()}
                                >
                                <Icon name="angle-left" size={20} color= {Color.PRIMARY}/>
                            </ButtonBase>
                        </Left>
                        <Body>
                            <Title style = {{color:Color.PRIMARY}}>{album.title}</Title>
                        </Body>
                        <Right style = {{paddingRight: 10}}>
                        <ButtonBase
                            transparent
                            onPress={() => { this.props.navigation.navigate('Upload', {album})}}
                        >
                            <Icon name="plus" size={20} color= {Color.PRIMARY}/>
                        </ButtonBase>
                        </Right>
                    </Header>
                    {this.state.hasImage? 
                        <SafeAreaView style = {{flex: 1, alignItems: 'center'}}>
                            <ImageView
                                images={images}
                                imageIndex={currentIndex}
                                isVisible={loadSingleImage}
                                renderFooter={(currentImage) => (<View style = {styles.singleImageFooter}>
                                                                    <Text style = {styles.singleImageText}>{currentImage.title}</Text>
                                                                </View>)}

                                onClose={() => {this.setState({loadSingleImage: false})}}>
                            </ImageView>
                            <FlatList
                                numColumns = {numColumns}
                                data = {images}
                                renderItem = {({item, index}) => {
                                    return(
                                        <TouchableOpacity
                                        activeOpacity= {0.5}
                                        underlayColor= {Color.GREY}
                                        onPress={() => {this.setState({currentIndex: index, loadSingleImage: true})}}>
                                            <View style = {{ alignItems: 'center', paddingBottom: 2, paddingLeft: 2, paddingRight: 2}}>
                                                <Image source={{uri: item.source.uri}}
                                                    style={{width: IMAGE_WIDTH/this.state.numColumns - 6, height: IMAGE_WIDTH/this.state.numColumns - 6}}/>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                                keyExtractor={item => item.id} 
                            />
                        </SafeAreaView>
                        :
                        <View style = {styles.contentContainer}>
                            <Text style = {{color: Color.SECONDARY}}>
                                No Image Found
                            </Text>
                        </View>
                    }
                </View>
            )
        }
        // Show spinner while loading images
        else {
            return (
                <View style = {styles.MainContainer}>
                    <Spinner visible={this.state.spinner} />
                </View>
            )
        }
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
}

const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },
})