import React, {Component} from 'react'
import{ View, Text, StyleSheet, StatusBar, Picker, TouchableHighlightBase} from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

import { Color } from '../../assets/Assets'
import DBHandler from '../../api/DBHandler'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'

export default class SignupPage extends Component {
    constructor(){
        super();
        this.DBHandler = DBHandler.getInstance();
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance();

        this.state = {
            dob: null, 
            gender: "Select",
            validData: false
        }
    }
    
    render() {
        return (
            <View style={styles.MainContainer}>
                <View style = {styles.contentContainer}>
                    <Text style = {styles.textHeader}> Date of Birth: </Text>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.dob}
                        mode="date"
                        format="DD-MM-YYYY"
                        showIcon= {false}
                        onDateChange={(date) => {this.setState({dob: date}, () => {this.verifyDetails()})}}
                    />
                        
                    <Text style = {styles.textHeader}> Gender: </Text>
                    <Picker
                        mode = 'dropdown'
                        style = {styles.pickerStyle}
                        selectedValue = {this.state.gender}
                        onValueChange = {(itemValue, itemIndex) => {this.setState({gender: itemValue }, () => {this.verifyDetails()})}}>
                        <Picker.Item label= "Select" value = "Selecr" />
                        <Picker.Item label= "Male" value = "Male" />
                        <Picker.Item label= "Female" value = "Female" />
                        <Picker.Item label= "Other" value = "Other" />
                    </Picker>

                </View>
                <View style = {styles.bottomView} >
                    <Button 
                        disabled = {!this.state.validData}
                        title = "Submit"
                        type = "clear"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: '100%'}}
                        onPress = {() => { this.handleSubmit() }}/>
                </View>
            </View>
        )
    }

    /* Submits user information to backend */
    async handleSubmit(){
        console.log('Creating Account...')
        // Checks if details are correct
        if (this.verifyDetails()){
            const response = await this.DBHandler.createAccount({
                dob: this.state.dob.toString(),
                gender: this.state.gender
            })
            if (response.data != null){
                console.log("Account Creation Success!")
                this.props.navigation.navigate('App', {userData: this.state.userData});
            }
        }
        // Invalid information
        else {
            console.log('invalid info')
        }
    }

    /* Verify that details are entered */
    verifyDetails(){
        if (this.state.dob == null){
            return false
        }
        if (this.state.gender == 'Select'){
            return false
        }
        this.setState({validData: true})
        return true
    }
}


const styles = StyleSheet.create({
    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    bottomView:{
		width: '100%', 
        height: 50, 
        flexDirection: 'row',
		backgroundColor: Color.PRIMARY,
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
    },
    contentContainer: {
        flex: 1,
        paddingLeft: 30,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY
    },

    text: {
        alignItems: 'flex-start',
        color: Color.SECONDARY
    },

    textHeader: {
        paddingTop: 30,
        alignItems: 'flex-start',
        color: Color.SECONDARY,
        fontSize:20
    },

    pickerStyle: {
        width: '100%',
        color: 'grey'
    }
})