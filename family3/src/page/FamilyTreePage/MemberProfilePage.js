import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';


import { Color } from '../../assets/Assets'

export default class MemberProfilePage extends Component {
    constructor(){
        super();
    }

    render() {
        // Fix Here. getParam should only have one parameter. 
    //   const node = this.props.navigation.getParam('node','nothing sent');
    
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
                        <Title style = {{color:Color.PRIMARY}}>{node.firstName + " " + node.lastName}</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                    <Text style = {{color: Color.SECONDARY}}>
                        first a card with their info, ie profile photo? or just the first photo that pops up and dob and emails
                        then it has tiles of photos tagged witht their fname last name or fullname
                    </Text>
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
