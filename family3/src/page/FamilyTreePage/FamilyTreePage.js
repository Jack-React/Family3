import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';

import GraphMaker from './GraphMaker';


import { Color } from '../../assets/Assets'
import ActionButton from 'react-native-action-button';

export default class MyPhotoPage extends Component {
    constructor(){
        super();
    }

    render() {
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
                            onPress={() => this.props.navigation.openDrawer()}
                            >
                            <Icon name="navicon" size={20} color= {Color.SECONDARY}/>
                        </ButtonBase>
                    </Left>
                    <Body>
                        <Title style = {{color:Color.SECONDARY}}>Sample</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                    <GraphMaker/>
                    <ActionButton
  buttonColor="rgba(231,76,60,1)"
  onPress={() => { console.log("hi")}}
/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        flex: 1,
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY
    },
})
