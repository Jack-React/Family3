import React, {Component} from 'react';
import{ View, Text, StyleSheet, Button, StatusBar} from 'react-native';

import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import { Color } from '../../assets/Assets';
import GoogleAPIHandler from '../../api/GoogleAPIHandler';

export default class HomePage extends Component {
    constructor(){
        super()
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance();
        this.state = {
            userData: null
        }
    }
    async componentDidMount(){
        const userData = await this.GoogleAPIHandler.getCurrentUser()
        this.setState({ userData })
    }

    render(){
        if (this.state.userData != null){
            return(
                <View style={styles.MainContainer}>
                    <Header style = {styles.headerContainer}>
                        <StatusBar
                            backgroundColor={Color.STATUS_BAR}
                            barStyle="light-content"
                        />
                        <Body>
                            <Title style = {{paddingLeft: 20, color:Color.PRIMARY}}>Family3</Title>
                        </Body>
                        <Right />
                    </Header>
                    <View style = {styles.contentContainer}>
                        <Text style = {styles.Text}>Welcome {this.state.userData.user.givenName}!</Text>
                        <Text style = {styles.Text}>This is the home screen</Text>
                    </View>
                    <View style = {styles.bottomView}>
                    </View>
                    
                </View>
            )
        }
        else {
            return null
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
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },

    bottomView:{
		width: '100%', 
		height: 50, 
		backgroundColor: Color.PRIMARY,
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
    },

    Text: {
        color: Color.SECONDARY,
    }
    
});
