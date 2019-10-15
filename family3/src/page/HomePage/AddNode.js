import React, { Component } from 'react';
import{ View, StyleSheet, Text, TextInput, Image, ScrollView, StatusBar, TouchableOpacity, AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';

import { Color } from '../../assets/Assets'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
//import { TextInput } from 'react-native-gesture-handler';

export default class AddNode extends Component {
    constructor(){
        super()
        this.state = { 
                name: '',
                gender: '',
                person1: '',
                person2: '',
                relationship: ''
        };
        this.GoogleAPIHandler = new GoogleAPIHandler()
    }

    // retrieve stored info when app loads
    componentDidMount = () => {
        AsyncStorage.getItem('name').then((value) => {
            this.setState({'name':value});

        })
        AsyncStorage.getItem('gender').then((value) => {
            this.setState({'gender':value});

        })
        AsyncStorage.getItem('person1').then((value) => {
            this.setState({'person1':value});

        })
        AsyncStorage.getItem('person2').then((value) => {
            this.setState({'person2':value});

        })
        AsyncStorage.getItem('relationship').then((value) => {
            this.setState({'relationship':value});

        })
        .done();
        
    }

    setName = (value) => {
        AsyncStorage.setItem('name', value);
        this.setState({'name': value});
    }
    setGender = (value) => {
        AsyncStorage.setItem('gender', value);
        this.setState({'gender': value});
    }
    setP1 = (value) => {
        AsyncStorage.setItem('person1', value);
        this.setState({'person1': value});
    }
    setP2 = (value) => {
        AsyncStorage.setItem('person2', value);
        this.setState({'person2': value});
    }
    setRelationship = (value) => {
        AsyncStorage.setItem('relationship', value);
        this.setState({'relationship': value});
    }

    
    render (){
        return (
            <View style={styles.MainContainer}>
                
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor={Color.STATUS_BAR}
                        barStyle="dark-content"
                    />
                    <Left>
                        <ButtonBase
                            transparent
                            onPress={() => {this.props.navigation.openDrawer()}}
                            >
                            <Icon name="navicon" size={20} color= {Color.SECONDARY}/>
                        </ButtonBase>
                    </Left>
                    <Body>
                        <Title style = {{color:Color.SECONDARY}}>Add Nodes</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.detailsContainer}>
                <Text> {"\n"}  Nodes {"\n"}</Text>
                
                    <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText = {this.setName}
                    //onChangeText={(value) => this.setState({name:value})}
                    placeholder = "Name"
                    />
                    
                    {/* {console.log(this.state.name)} */}

                    <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText = {this.setGender}
                    placeholder = "Gender"
                    />
                    
                    <Text>
                        {"\n"}Links {"\n"}
                    </Text>
                    
                    <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText = {this.setP1}
                    placeholder = "Person 1"
                    />
                    <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText = {this.setP2}
                    placeholder = "Person 2"
                    />
                    <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText = {this.setRelationship}
                    placeholder = "Relationship"
                    />
                    
                    </View>
                    <View style = {styles.buttonContainer}>
                    <Button
                    title = "Save"
                    color="blue"
                    titleStyle = {{color: Color.SECONDARY}}
                    buttonStyle = {{width: 100}}
                    backgroundColor = "#841584"
                    onPress = {() => this.props.navigation.navigate('Home')}/>
                    </View>

                    
                     {/*print the values 
                      <Text>
                        Name: {this.state.name}{" "}
                        Gender: {this.state.gender}{" "}
                        Person 1: {this.state.person1}
                    </Text>  */}
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY,
        fontSize: 30
    },

    detailsContainer: {
                 flex: 1,
                 alignItems: 'stretch',
                 justifyContent: 'center',
                 flexDirection: 'column', 
                 letterSpacing: 10,
                 marginTop: 10
                 
            },
    

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY, 
        fontSize: 30
    },

    buttonContainer: {
                position: 'absolute',
                top: 80,
                right: 20
            },
        
});
