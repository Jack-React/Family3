import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';

import AddRelationship from './component/AddRelationship';
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
							onPress={() => this.props.navigation.goBack()}
							>
							<Icon name="angle-left" size={20} color= {Color.PRIMARY}/>
						</ButtonBase>
					</Left>
					<Body>
						<Title style = {{ color: Color.PRIMARY}}> Add Relationship </Title>
					</Body>
					<Right/>
				</Header>
                <AddRelationship
                navigation = {this.props.navigation}/>
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
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },
})
