import React, { Component } from 'react';
import{ Text, StyleSheet, TouchableOpacity } from 'react-native';



import { Color } from '../../../assets/Assets';

export default class TouchableAlbumComponent extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <TouchableOpacity
            style={styles.touchableButton}
            activeOpacity= {0.5}
            underlayColor= {Color.GREY}
            onPress={() => this.props.navigateSelectedAlbum(this.props.album.id)}>
                <Text style = {styles.textStyle}> {this.props.album.title} </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        padding: 20,
        backgroundColor: Color.PRIMARY,
    },
    textStyle: {
        color: Color.SECONDARY,
        fontSize: 15
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    dividerStyle: {
        backgroundColor: Color.GREY,
        height: 1
    }
})