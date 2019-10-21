import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import AddRelationship from './AddRelationship';

import { Color } from '../../assets/Assets.js'

export default class AddRelationshipsPage extends Component {
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

                     <AddRelationship/>

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
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY
    },
})
