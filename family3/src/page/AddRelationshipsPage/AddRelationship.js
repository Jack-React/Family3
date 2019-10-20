import React, { Component } from 'react';
import{ View, StyleSheet, Text, TextInput, Image, ScrollView, StatusBar, TouchableOpacity, AsyncStorage, Picker, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';

import { Color } from '../../assets/Assets'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import APIHandler from '../../api/APIHandler'
import DBHandler from '../../api/DBHandler'

// sample user data
const sampleData1 = {
    _id: "108847325318354420000",
    create_date: "2019-10-13T14:37:49.968Z",
    firstName: "Xun",
    lastName: "Zhang",
    email: "zhangxunsnail@gmail.com",
    family: "5d89a94281b02708c8e0e24c",
    __v: 0,
    DOB: "1998-09-08T00:00:00.000Z",
    gender: "Female"
}


// sample family database
const dbData =[
    {
    _id: "597b0ddfe8e0bd240cc166f2f1ececb493cfda372865096fc84bb9ecbd362c55",
    create_date: "2019-10-07T12:41:05.406Z",
    firstName: "Xiaojian",
    lastName: "Zhang",
    DOB: "1963-05-12T00:00:00.000Z",
    gender: "Male",
    __v: 0,
    family: "5d89a94281b02708c8e0e24c"
    },
    {
    _id: "07a6e943a89656b28e690756b00ee66134c3f54bda4b2164b48837062245051b",
    create_date: "2019-10-07T12:46:07.574Z",
    firstName: "Zhifu",
    lastName: "Zhang",
    DOB: "1937-07-20T00:00:00.000Z",
    gender: "Male",
    __v: 0,
    family: "5d89a94281b02708c8e0e24c"
    },
    {
    _id: "108847325318354420000",
    create_date: "2019-10-13T14:37:49.968Z",
    firstName: "Xun",
    lastName: "Zhang",
    email: "zhangxunsnail@gmail.com",
    family: "5d89a94281b02708c8e0e24c",
    __v: 0,
    DOB: "1998-09-08T00:00:00.000Z",
    gender: "Female"
    },
    {
    _id: "fd9f719e6e60bcff37740cad2f6447a395bfe06fcd5810cd09ef3fadc9216e9f",
    create_date: "2019-10-17T05:18:40.018Z",
    firstName: "test",
    lastName: "mother",
    DOB: "1970-01-01T00:00:00.000Z",
    gender: "Female",
    email: "test@gmail.com",
    family: "5d89a94281b02708c8e0e24c",
    __v: 0
    },
    {
    _id: "89cc08a7b1d3ec1469f452b9aff7cef2f9db49ea4bcbba260da1577eb777b852",
    create_date: "2019-10-17T05:19:47.769Z",
    firstName: "test",
    lastName: "grandmother",
    DOB: "1940-01-01T00:00:00.000Z",
    gender: "Female",
    email: "test@gmail.com",
    family: "5d89a94281b02708c8e0e24c",
    __v: 0
    }
    ]

export default class AddRelationship extends Component {
    constructor(){
        super()
        this.state = { 
                name: '',
                gender: '',
                familyid: '',
                person1: '',
                person2: '',
                relationship: '',
                userData: null
        };
        this.GoogleAPIHandler = new GoogleAPIHandler()
        this.APIHandler = new APIHandler()
        this.DBHandler = new DBHandler()
    }

    // retrieve stored info when app loads
    async componentDidMount() {
        const userData = await this.DBHandler.getDBUserData()

        const familyid = userData.family;

        const membersData = (await this.APIHandler.getFamilyMembers(familyid)).data;
        // set to family database data loaded from backend
        this.setState({
            familyid: familyid,
            userData: membersData
        })
    };

    setName = (value) => {
        //AsyncStorage.setItem('name', value);
        this.setState({'name': value});
    }
    setGender = (value) => {
        //AsyncStorage.setItem('gender', value);
        this.setState({'gender': value});
    }
    setP1 = (value) => {
        //AsyncStorage.setItem('person1', value);
        this.setState({'person1': value});
    }
    setP2 = (value) => {
        //AsyncStorage.setItem('person2', value);
        this.setState({'person2': value});
    }
    setRelationship = (value) => {
        //AsyncStorage.setItem('relationship', value);
        this.setState({'relationship': value});
    }


    // stores linking info in JSON object
    async storeData() {
        // var links = JSON.stringify(this.state, ['name', 'gender', 'person1', 'person2', 'relationship']);
        // console.log(links)
        var links = JSON.stringify(this.state, ['person1', 'person2', 'relationship']);
        console.log(links)
        if (this.verifyDetails()) {
            const response = await this.APIHandler.addRelation(this.state.familyid, links)
            if (response.data != null) {
                console.log("Account Creation Success!")
                // this.props.navigation.navigate('App', { userData: this.state.userData });
            }
        }
        // Invalid information
        else {
            console.log('invalid info')
        }
    }

    verifyDetails() {
        const validrelation = ['parent-child', 'husband-wife'];
        if (validrelation.indexOf(this.state.relationship) < 0) {
            return false
        }
        return true
    }

    render (){
        if(this.state.userData==null){
            return (<ActivityIndicator size="large" color="#3275a8" />)
        }
        else {
            var arr = Array(this.state.userData.length-1);
        var j = 0;

        // var obj = this.state.userData;
        //     var array = Array(8);
        //     var i = 0;
        //     var j = 0;
        //     for (var key in obj) {
        //         if (obj.hasOwnProperty(key)) {
        //             var val = obj[key];
        //             //array.push(val);
        //             array.splice(i, 0, val);
        //             i += 1;
        //         }
        //     }

        // create an array containing all first names of family in database
        for (var i = 0; i < this.state.userData.length; i++) {
            var object = this.state.userData[i];
            for (var property in object) {
               if (property == "firstName") {
                    arr.splice(j,0,object[property]);
                    j += 1;
                     }
                  }
                }

        return (

            <ScrollView style={styles.MainContainer}>

                <View style = {styles.detailsContainer}>

                <Text style = {{color: Color.SECONDARY}}> {"\n"}  Nodes {"\n"}</Text>

                    <Text> {"\n"}  Name: {"\n"}</Text>

                    <View style = {styles.viewStyleForLine}></View>
                    <Picker style = {styles.pickerContainer}
                    selectedValue = {this.state.name}
                    onValueChange = {this.setName}>

                    {/* renders selection based on first name in database */}
                    {arr.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index}/>)
                    })}

                    </Picker>

                    {/* {console.log(this.state.name)} */}
                    <Text> {"\n"}  Gender: {"\n"}</Text>
                    <View style = {styles.viewStyleForLine}></View>
                    <Picker
                    selectedValue = {this.state.gender}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onValueChange = {this.setGender}
                    mode = 'dialog'
                    placeholder={'Gender'}
                    prompt = {'Gender'}>

                    <Picker.Item label = "Male" value = "male"
                    />
                    <Picker.Item label = "Female" value = "female" />
                    </Picker>

                    <Text style = {{color: Color.SECONDARY}}>
                        {"\n"}  Links
                    </Text>

                    <Text> {"\n"}  Person 1: {"\n"}</Text>

                    <View style = {styles.viewStyleForLine}></View>

                    <Picker style = {styles.pickerContainer}
                    selectedValue = {this.state.person1}
                    onValueChange = {this.setP1}
                    >
                    {arr.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index}/>)
                    })}

                    </Picker>

                    <Text> {"\n"}  Person 2: {"\n"}</Text>

                    <View style = {styles.viewStyleForLine}></View>
                    <Picker style = {styles.pickerContainer}
                    selectedValue = {this.state.person2}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onValueChange = {this.setP2}>
                    {arr.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index}/>)
                    })}
                    </Picker>

                    <Text> {"\n"}  Relationship: {"\n"}</Text>
                    <View style = {styles.viewStyleForLine}></View>
                    <Picker
                    selectedValue = {this.state.relationship}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onValueChange = {this.setRelationship}
                    mode = 'dialog'
                    placeholder={'Relationship'}
                    prompt = {'Relationship'}>

                    <Picker.Item label = "Parent-child" value = "parent-child"
                    />
                    <Picker.Item label = "Husband-wife" value = "husband-wife" />
                    </Picker>

                    {/* <TextInput style= {styles.pickerContainer}
                    onChangeText = {this.setRelationship}
                    placeholder = "Relationship e.g. parent-child"
                    /> */}
                    </View>

                    <View style = {styles.buttonContainer}>
                    <Button
                    title = "Save"
                    color="black"
                    titleStyle = '#ffffff'
                    buttonStyle = {{width: 100}}
                    backgroundColor = "#841584"
                    onPress = {() => {this.props.navigation.navigate('Home'); this.storeData()}}/>
                    {/* <TouchableOpacity
                    onPress = {() => {this.props.navigation.navigate('Home'); this.storeData()}}
                    TouchableOpacity/>
                    <Text > Save</Text> */}
                    </View>


            </ScrollView>
        );
    }
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
                top: 65,
                right: 20,
                padding: 10,

    },
    viewStyleForLine: {
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        width: "100%"
    },

    pickerContainer: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }

});
