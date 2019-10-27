import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar,ScrollView, RefreshControl, Dimensions} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import { Card, ListItem, ButtonCard, IconCard } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import GoogleAPIHandler from '../../api/GoogleAPIHandler';
import ImageGrid from './component/SearchedPhotoGrid.js';


import { Color } from '../../assets/Assets.js'
const IMAGE_WIDTH = Dimensions.get('window').width
export default class MemberProfilePage extends Component {
    constructor(){
        super();
        // const node = this.props.navigation.getParam('node','nothing sent');
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance();
        this.state = {
            albums: [],
            searchedImages: [],

            loaded: false,
            isLoading: true,

            refreshing: false,
            // node: this.props.navigation.getParam('node','nothing sent')
        }
    }

    async refresh(){
        this.setState({
            loaded: false,
            isLoading: true,

        })

        this.componentDidMount()
        setTimeout(() => {
            this.setState({refreshing: false})
        }, 2000)
    }

    // // TODO:
    // get all the albums check
    //  set isloading to true when component starting up
    // get a list of all the album id check
    //  set timer for when fetching images
    // get mediaItems from all the albums check
    // then sort
    // then feed to image grid

    async componentDidMount(){

        // getting albums code from album page
        const sharedAlbums = await this.GoogleAPIHandler.getSharedAlbums()
        const albums = await this.GoogleAPIHandler.getAlbums()
        console.log('shared album' ,sharedAlbums)
        if (albums.albums == undefined){
            if (sharedAlbums.sharedAlbums == undefined){
                this.setState({ loaded: true })
            }
            else {
                this.setState({ albums: sharedAlbums.sharedAlbums, loaded: true })
            }
        }
        else {
            if (sharedAlbums.sharedAlbums == undefined){
                console.log("no shared albums")
                this.setState({ albums: albums.albums, loaded: true })
            }
            else {
                console.log("yes shared albums")
                this.mergeAlbums(albums.albums, sharedAlbums.sharedAlbums)
                this.setState({ albums: albums.albums, loaded: true })
            }
            var allImages = await this.mergePicsFromAlbums(albums.albums);
            const node = this.props.navigation.getParam('node');
            var name = node.name;
            var searchedImages = this.updateSearch(name, allImages);
            // var searchedImages = this.updateSearch('test', allImages); // upgrade: do inclusive or for search
            console.log('searched images',searchedImages);
            this.setState({ searchedImages: searchedImages, loaded: true, isLoading: false });


        }
    }

    // makes image object acceptable format for grid
    // makesearchedImages(imageList){
    //   var array = [];
    //   for (var i = 0; i < imageList.length; i++) {
    //     var url = imageList[i].source.uri;
    //     var id = imageList[i].id;
    //     var img = {id: id, src: url};
    //     array.push(img);
    //   }
    //   console.log('searchedImages made from', imageList, 'to', array);
    //   return array;
    // }

    mergeAlbums(albumA, albumB){
        console.log("merging albums")
        for (i = 0; i < albumB.length; i ++){
            if (this.containsAlbum(albumB[i], albumA) == false){
                albumA.push(albumB[i]);
            }
        }
        console.log('album', albumA)
    }

    containsAlbum(album, albums) {
        var i;
        for (i = 0; i < albums.length; i++) {
            if (albums[i].id === album.id)
                return true;
        }
        return false;
    }


    // gets an array of album objects and merges all the pics to a single array for searching
    async mergePicsFromAlbums(albums){ // not sure if i should be using async in async function here here
      // this is going to be a 2d images array untill i concat it
      var imageList = [];
      for (var i = 0; i < albums.length; i++) {
        var album = albums[i];
        if (album.mediaItemsCount){
            var response = await this.GoogleAPIHandler.getMediaItems(album.id)
            var images = this.prepareImages(response);
            imageList.push(images);
        }
      }
      // not sure what this setinterval is for
      // setInterval(() => {
      //     this.setState({
      //         hasImage: true,
      //         spinner: false,
      //         album: album,
      //         images: images,
      //         loaded: true,
      //         shared: (album.shareInfo != undefined)
      //     })
      // }, 3000);
      // make 2d array into 1darray
      var flatted = [].concat.apply([], imageList);

      return flatted;

    }

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
        console.log('album converted to images:', imageList);
        return imageList
    }

    //jp's search function rewritten to not affect state
    updateSearch(search, imageList){
        searchedImages = [];
        for (i = 0; i < imageList.length; i ++){
            // Checks if theres a desciprion
            if (imageList[i].title){
                // Checks if description includes search text
                if (imageList[i].title.toLowerCase().includes(search.toLowerCase())){
                    searchedImages.push(imageList[i])
                }
            }
        }

        console.log('searching for', search,'in',imageList, 'found', searchedImages);
        if (search == "")
            return imageList
        else
            return searchedImages;
    }

    render() {
        // Fix Here. getParam should only have one parameter.
      const node = this.props.navigation.getParam('node','nothing sent');

      const {  isLoading , refreshing } = this.state;
      // Show spinner while loading albums
      var imageGridPlaceholder;
      if (isLoading){
        imageGridPlaceholder = (
            <View style = {styles.MainContainer}>
                <Spinner visible={isLoading} />
            </View>
        );
      }else {

        if (!(this.state.searchedImages)) {
          imageGridPlaceholder = (<Text style = {styles.card} > Couldn't find any images tagged with #{node.name}, try adding some images :) </Text>)
        }else {
          imageGridPlaceholder = (
              <ImageGrid searchedImages = {this.state.searchedImages}/>
          );
        }


      }





      console.log('recieved node', node);
      const searchedImages = this.state.searchedImages;
      console.log('searchedImages is ', searchedImages);

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
                        <Title style = {{color:Color.PRIMARY}}>{node.name }</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => this.refresh()} />
                }>
                  <View>
                    <ProfileCard node= {node} />
                  </View>
                  <View>
                    {imageGridPlaceholder}
                  </View>
                </ScrollView>
                </View>

            </View>
        )
    }
}
// takes a node, and then maybe a random image and displays the node and image along side it
class ProfileCard extends Component{
  constructor(props){
    super(props);
    this.state = {name:'Frarthur'};
  }
  render(){
    const node = this.props.node

    // if no image is recieved
    return(
    <View>
      <Card style = {styles.card} title =  {node.name}>
        <Text>Gender: {node.data.gender} </Text>
        <Text>DOB: {node.data.DOB.substring(0,10)} </Text>
      </Card>

    </View>);
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
    card: {
        backgroundColor:Color.PRIMARY,
        flex:1,
        marginLeft: '5%',
        width: '90%',
        borderRadius: 10
    },

    cardImage: {
        width: IMAGE_WIDTH * 0.90,
        height: 300,
        resizeMode: 'cover',
    },

    cardText:{
        alignSelf: 'center',
        marginTop: 10,
        marginLeft: -10,
        fontSize:15,
        color: Color.SECONDARY,
    },
    centerMessage:{
        position:'absolute',
        left:0,
        right:0,
        marginLeft :'auto',
        marginRight :'auto',
        fontSize:15,
        color: Color.SECONDARY,
    }
})
