import React, { Component } from 'react';
import{ StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardItem, Text, Button, Left, Body, Right } from 'native-base';

import { Color } from '../../../assets/Assets';

const IMAGE_WIDTH = Dimensions.get('window').width
export default class TouchableAlbumComponent extends Component{
    constructor(){
        super();
    }

    render(){
        const {album} = this.props
        return (
            <Card style = {styles.card}>
                <CardItem>
                    <Left>
                        <Body>
                        <Text style = {styles.cardText}>{album.title.toUpperCase()}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image 
                    source = {album.coverPhotoBaseUrl? {uri: album.coverPhotoBaseUrl}: require('../../../assets/Image/NoImage.jpg')}
                    style={styles.cardImage}/>
                </CardItem>
                <CardItem style = {{height: 50}}>
                    <Left>
                        <Button transparent>
                        <Icon style = {{}} name="photo" size={20} color= {Color.SECONDARY}/>   
                        {album.mediaItemsCount != undefined?
                            <Text>{album.mediaItemsCount + ' Images'}</Text>
                            :
                            <Text>{'No Images'}</Text>
                        }
                        </Button>
                    </Left>
                    <Right>
                        {album.shareInfo != undefined ? 
                        <Icon style = {{}} name="group" size={20} color= {Color.SECONDARY}/>         
                        :
                        null}    
                    </Right>
                </CardItem>
          </Card>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor:Color.SECONDARY,
        flex:1,
        marginLeft: '10%',
        width: '80%', 
        elevation: 1,
    },

    cardImage: {
        flex:1,
        width: IMAGE_WIDTH * 0.8,
        height:200,
        resizeMode: 'cover',
    },

    cardText:{
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize:18,
        color: Color.SECONDARY,
    }
})