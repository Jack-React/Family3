import React, {Component} from 'react'
import{ View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { Divider } from 'react-native-elements';


import { Color } from '../../assets/Assets';
import GoogleAPIHandler from '../../api/GoogleAPIHandler';
import TouchablaAlbumComponent from './component/TouchablaAlbumComponent';
import AddAlbumDialogComponent from './component/AddAlbumDialogComponent';


export default class AlbumPage extends Component {
    constructor(){
        super();
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance();
        this.state = {
            albums: [],
            loaded: false,
            spinner: true,
            showDialog: false
        }
    }

    async componentDidMount(){
        setInterval(() => {
            this.setState({
                spinner: false
            });
        }, 3000);
        const response = await this.GoogleAPIHandler.getAlbums()
        this.setState({ albums: response.albums, loaded: true, spinner: false })
    }

    render() {
        const {albums, loaded } = this.state; 
        // Show spinner while loading albums
        if (this.state.spinner){
            return (
                <View style = {styles.MainContainer}>
                    <Spinner visible={this.state.spinner} />
                </View>
            )
        }

        if (loaded){
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
                        <ScrollView>

                            <AddAlbumDialogComponent 
                            visible={this.state.showDialog} 
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
                                            <Divider style={styles.dividerStyle}/>
                                        </View>
                                    )
                                })}
                            </View> 

                        </ScrollView>
                        : <View style = {styles.contentContainer}><Text> No Albums Found! </Text></View> }
                </View>
            )
        }
        else {
            return null
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
        console.log(albumDetails.shareable)
        const album = await this.GoogleAPIHandler.createAlbum(albumDetails.name);
        if (albumDetails.shareable){
            response = await this.GoogleAPIHandler.shareAlbum(album.id)
            console.log(response)
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
        justifyContent: 'center',
        paddingTop: 2
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },

    dividerStyle: {
        backgroundColor: Color.GREY,
        height: 1
    },
    albumStyle: {
        width: '100%'
    }
})