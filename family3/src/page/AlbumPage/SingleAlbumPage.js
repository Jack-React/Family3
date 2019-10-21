import React, {Component} from 'react'
import{ View, StyleSheet, StatusBar, Text, Image, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Header, Left, Button as ButtonBase, Right, Body, Title, Fab, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageView from 'react-native-image-view';
import { SearchBar } from 'react-native-elements';

import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import DBHandler from '../../api/DBHandler'
import { Color } from '../../assets/Assets'
import ShareConfirmationDialog from './component/ShareConfimationDialog';

const IMAGE_WIDTH = Dimensions.get('window').width

export default class SingleAlbumPage extends Component {
    constructor(){
        super();
        this.DBHandler = DBHandler.getInstance();
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance();
        this.state = {
            album: {},
            images: {},
            loaded: false,
            spinner: true,
            numColumns: 3,
            loadSingleImage: false,
            currentIndex: 0,
            hasImage: false,
            active: true,
            shared: false,
            showDialog: false,
            search: "",
            searchedImages: null,
            owned: false,
        }
    }

    async componentDidMount(){
        album = this.props.navigation.getParam('album')
        if (album.shareInfo != undefined){
            this.setState({sharedAlbum: true})
            if (album.shareInfo.isOwned != undefined){
                this.setState({owned : true})
            }
        }
        if (album.mediaItemsCount){
            const response = await this.GoogleAPIHandler.getMediaItems(album.id)
            const images = this.prepareImages(response);
            setInterval(() => {
                this.setState({
                    hasImage: true,
                    spinner: false,
                    album: album,
                    images: images,
                    loaded: true,
                    shared: (album.shareInfo != undefined)
                })
            }, 3000);
        }
        else {
            this.setState({ 
                loaded: true, 
                album: album,
                spinner: false, 
                shared: (album.shareInfo != undefined)
            })
        }
    }

    render() {
        const {images, numColumns, loadSingleImage, currentIndex, album, shared, searchedImages } = this.state;
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
                        {(this.state.owned) || (!this.state.shared)?
                        <TouchableOpacity
                        onPress={() => this.setState({showDialog: true})}>
                            <Text style = {styles.headerButtonStyle}>
                                {shared? "Unshare": "Share"}
                            </Text>
                        </TouchableOpacity>
                        :
                        null
                        }
                        </Right>
                    </Header>
                    {this.state.hasImage? 
                        <SafeAreaView style = {{flex: 1, alignItems: 'flex-start'}}>
                             <View style = {{width: '100%', borderColor: 'black', padding:5, marginBottom: 10, marginTop:10}}>
                                <SearchBar
                                    platform= 'android'
                                    placeholder="Search for a keyword"
                                    containerStyle = {{borderRadius: 10, elevation: 15, height: 50 }}
                                    inputContainerStyle = {{paddingBottom:5, }}
                                    inputStyle={{fontSize: 14, marginLeft:2, paddingTop:5, }}
                                    leftIconContainerStyle = {{ paddingBottom: 5 }}
                                    rightIconContainerStyle = {{ paddingBottom: 5 }}
                                    onChangeText= {(search) => this.updateSearch(search)}
                                    value={this.state.search}
                                />
                             </View>
                            
                            <ImageView
                                images={(searchedImages == null)? images: searchedImages}
                                imageIndex={currentIndex}
                                isVisible={loadSingleImage}
                                renderFooter={(currentImage) =>(
                                    <View style = {styles.singleImageFooter}>
                                        <Text style = {styles.singleImageText}>{currentImage.title}</Text>
                                    </View>)
                                }
                                onClose={() => {this.setState({loadSingleImage: false})}}>
                            </ImageView>

                            <FlatList
                                numColumns = {numColumns}
                                data = {(searchedImages == null)? images: searchedImages}
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
                            <ShareConfirmationDialog
                            visible={this.state.showDialog}
                            share={!shared}
                            disableDialog={this.disableDialog.bind(this)}
                            approvalRecieved={this.approvalRecieved.bind(this)}
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

    // Handles the event where share button is pressed
    async handleShare(){
        const { shared, album } = this.state
        // Handles when the user ushared the abum
        if (shared){
            await this.GoogleAPIHandler.unShareAlbum(album.id)
            familyid = (await this.DBHandler.getDBUserData()).family
            if (familyid != undefined){
                response = await this.DBHandler.deleteSharedAlbum(familyid, album.id)
            }
            this.state.album.shareInfo = null
            this.setState({shared: false})
        }
        
        // Handles when user shares the album
        else {
            const shareToken = (await this.GoogleAPIHandler.shareAlbum(album.id)).shareInfo.shareToken
            album_data = {albumid: album.id, sharedToken: shareToken}
            familyid = (await this.DBHandler.getDBUserData()).family
            if (familyid != undefined){
                response = await this.DBHandler.addSharedAlbum(familyid, album_data)
            }
            this.state.album.shareInfo = {}
            this.setState({shared: true, spinner:false, owned: true})   
        }
    }

    // Disables the dialog
    disableDialog(){
        this.setState({
            showDialog: false
        })
    }

    // recieve confirmation
    approvalRecieved(){
        this.handleShare()
    }

    // Update the searched images
    updateSearch(search){
        searchedImages = [];
        for (i = 0; i < this.state.images.length; i ++){
            // Checks if theres a desciprion
            if (this.state.images[i].title){
                // Checks if description includes search text
                if (this.state.images[i].title.toLowerCase().includes(search.toLowerCase())){
                    searchedImages.push(this.state.images[i])
                }
            }
        }
        if (search == "")
            this.setState({search: search, searchedImages: null})
        else 
            this.setState({search: search, searchedImages: searchedImages})
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

    headerButtonStyle: {
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 10, 
        fontSize: 20,
        color:Color.PRIMARY
    },

    singleImageFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        // position: "absolute",
        // marginBottom: 20,

    },

    singleImageText: {
        color: Color.PRIMARY,
        paddingBottom: 10
    }

})