import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native';

import { Color } from '../../../assets/Assets'

export default class NoImageComponent extends Component {

    render() {
        return (
            <View style = {styles.mainContainer}>
                <Text style = {{color: Color.SECONDARY}}>
                    No Image Found
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.PRIMARY
    },

    text: {
        color: Color.SECONDARY
    }
})