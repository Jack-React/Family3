import React, {Component} from 'react';
import{ View, Button, Text, StyleSheet, StatusBar} from 'react-native';


export default class HomeScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const userData = (this.props.navigation.getParam('userData'));
        
        return(
            <View style = {styles.MainContainer}>
                
                <Text style = {{color:'white'}}> Welcome {userData.user.givenName}!</Text>
                <Text style = {{color:'white'}}>This is the home page!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#35394A',
    },

    bottomView:{
		width: '100%', 
		height: 50, 
		backgroundColor: '#35394A', 
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
	},
});