import React, {Component} from 'react'
import{ View, Text, StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { Header, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import { Color } from '../../assets/Assets';
import GoogleAPIHandler from '../../api/GoogleAPIHandler';
import DBHandler from '../../api/DBHandler';

import TouchablaAlbumComponent from './component/TouchablaAlbumComponent';
import AddAlbumDialogComponent from './component/AddAlbumDialogComponent';

export default class AlbumPage extends Component {
    constructor(){
        super();
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance();
        this.DBHandler = DBHandler.getInstance()
        this.state = {
            albums: [],
            loaded: false,
            isLoading: true,
            showDialog: false,
            refreshing: false,
        }
    }

    async componentDidMount(){
        const sharedAlbums = await this.GoogleAPIHandler.getSharedAlbums()
        const albums = await this.GoogleAPIHandler.getAlbums()
        console.log('shared album' ,sharedAlbums)
        if (albums.albums == undefined){
            if (sharedAlbums.sharedAlbums == undefined){
                this.setState({ loaded: true, isLoading: false })
            }
            else {
                this.setState({ albums: sharedAlbums.sharedAlbums, loaded: true, isLoading: false })
            }
        }
        else {
            if (sharedAlbums.sharedAlbums == undefined){
                console.log("!")
                this.setState({ albums: albums.albums, loaded: true, isLoading: false })
            }
            else {
                console.log("@")
                this.mergeAlbums(albums.albums, sharedAlbums.sharedAlbums)
                this.setState({ albums: albums.albums, loaded: true, isLoading: false })
            }
        }
    }

    render() {
        const { albums, isLoading, showDialog, refreshing } = this.state; 
        // Show spinner while loading albums
        if (isLoading){
            return (
                <View style = {styles.MainContainer}>
                    <Spinner visible={isLoading} />
                </View>
            )
        }
        else{
            return (
                <View style={styles.MainContainer}>
                    <Header style = {styles.headerContainer}>
                        <StatusBar
                            backgroundColor={Color.STATUS_BAR}
                            barStyle="light-content"
                        />
                        <Body style = {{paddingLeft: 20}}>
                            <Title style = {{color:Color.PRIMARY}}>My Albums</Title>
            
                        </Body>
                        <Right style = {{paddingRight: 10}}>
                            <ButtonBase
                                transparent
                                onPress={() => { this.setState({showDialog: true}) }}
                            >
                                <Icon name="plus" size={20} color= {Color.PRIMARY}/>
                            </ButtonBase>
                        </Right>
                    </Header>
                    {albums.length > 0 ?
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={() => this.refresh()} />
                            }
                        >
                            <AddAlbumDialogComponent 
                            visible={ showDialog } 
                            disableDialog={this.disableDialog.bind(this)}
                            recieveAlbumDetails={this.recieveAlbumDetails.bind(this)}
                            />
                            <View style = {styles.contentContainer}>
                                {albums.map((album) => {
                                    return(
                                        <View key={album.id} style={styles.albumStyle}>
                                            <TouchablaAlbumComponent 
                                            album = {album} 
                                            navigateSelectedAlbum = {this.navigateSelectedAlbums.bind(this)}/>
                                        </View>
                                    )
                                })}
                            </View> 
                        </ScrollView>
                        : 
                        <View style = {styles.contentContainer}><Text> No Albums Found! </Text></View> }
                </View>
            )
        }
    }

    // Navigate to selected Album
    navigateSelectedAlbums(albumID){
        for (index = 0; index < this.state.albums.length; index ++){
            if (this.state.albums[index].id == albumID){
                album = this.state.albums[index]
                this.props.navigation.navigate('SingleAlbum', {album});
                return
            }   
        }
        console.warn('Album ID Not Found.')
    }

    // Disables the dialog
    disableDialog(){
        this.setState({
            showDialog: false
        })
    }

    // recieve album details from popup dialog component
    async recieveAlbumDetails(albumDetails){
        // Creates Album
        const album = await this.GoogleAPIHandler.createAlbum(albumDetails.name);
        if (albumDetails.shareable){
            familyid = (await this.DBHandler.getDBUserData()).family
            if (familyid != undefined){
                const shareToken = (await this.GoogleAPIHandler.shareAlbum(album.id)).shareInfo.shareToken
                album_data = {albumid: album.id, sharedToken: shareToken}
                response = await this.DBHandler.addSharedAlbum(familyid, album_data)
            }
        }
        this.setState({
            loaded: false,
            isLoading: true,
            albums: []
        })
        this.componentDidMount()
    }

    // Check if album is in array or albums
    containsAlbum(album, albums) {
        var i;
        for (i = 0; i < albums.length; i++) {
            if (albums[i].id === album.id) 
                return true;
        }
        return false;
    }

    // Merged Both shared albums and non shared albums
    mergeAlbums(albumA, albumB){
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
        for (i = 0; i < albumB.length; i ++){
            if (this.containsAlbum(albumB[i], albumA) == false){
                albumA.push(albumB[i]);
            }
        }
        console.log('album', albumA)
    }
    
    // This function updates album
    async refresh(){
        this.setState({
            loaded: false,
            isLoading: true,
            albums: []
        })
        
        this.componentDidMount()
        setTimeout(() => {
            this.setState({refreshing: false})
        }, 2000)
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
        justifyContent: 'center',
        paddingTop: 2
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },

    albumStyle: {
        width: '100%',
        paddingTop:10,
        paddingBottom:10
    },
})