import React, { Component } from 'react';
import{ StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image, Divider } from 'react-native-elements';
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
            <TouchableOpacity
            activeOpacity= {0.5}
            underlayColor= {Color.GREY}
            onPress={() => this.props.navigateSelectedAlbum(this.props.album.id)}>
                <Card style = {styles.card}>
                    
                    <CardItem cardBody style = {{borderTopStartRadius: 10, borderTopEndRadius:10, overflow: 'hidden'}}>
                        <Image 
                        source = {album.coverPhotoBaseUrl? {uri: album.coverPhotoBaseUrl}: require('../../../assets/Image/NoImage.jpg')}
                        style={styles.cardImage}/>
                    </CardItem>
                    <CardItem style = {{height: 10}}>
                        <Left>
                                <Body>
                                    <Text style = {styles.cardText}>{album.title.toUpperCase()}</Text>
                                </Body>
                            </Left>
                    </CardItem>
                    <Divider style = {{alignSelf: 'center', marginTop: 10, width: IMAGE_WIDTH * 0.85}}/>
                    <CardItem style = {{height: 50, borderBottomStartRadius: 10, borderBottomEndRadius: 10}}>
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
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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
    }
})