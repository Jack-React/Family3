import React, {Component} from 'react';
import{ View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import { Color } from '../assets/Assets';


// ... return <Icon name='rocket' size={30} color='#900' />



export default class HomeScreen extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const userData = (this.props.navigation.getParam('userData'));
        return(
            <View style={styles.MainContainer}>
                
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor={Color.PRIMARY_DARK}
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
                        <Title>Home</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                    <Text style = {styles.Text}>Welcome {userData.user.givenName}!</Text>
                    <Text style = {styles.Text}>This is the home screen</Text>
                </View>
                <View style = {styles.bottomView}>
                    <Button
                        title='Upload an Image'
                        onPress= {() => {this.props.navigation.navigate('Upload');}}
                    />
                </View>
                
            </View>
            // </DrawerContainer>
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
