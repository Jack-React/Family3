import React, { Component } from 'react';
import{ View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';


import { Color } from '../../../assets/Assets'
import GoogleAPIHandler from '../../../api/GoogleAPIHandler'



export default class PreviewComponent extends Component {
    constructor(){
        super()
        this.state = {
            images: null,
            count: 0,
            loaded: false,
            isSubmitting:false,
        }
        this.GoogleAPIHandler = new GoogleAPIHandler()
    }

    componentDidMount(){
        this.setState({
            images: this.props.navigation.getParam('images'),
            count: this.props.navigation.getParam('images').length,
            loaded: true
        })
    }

    componentWillUnmount(){
        this.setState({
            images: null,
            count: 0,
            loaded: false
        })
    }

    render (){
        if (this.state.loaded){
            return (
                <View style = {styles.MainContainer}>
                    <Spinner visible={this.state.isSubmitting} />

                    <ScrollView>
                        {this.renderImage(0)}
                        {this.renderImage(1)}
                        {this.renderImage(2)}
                        {this.renderImage(3)}
                        {this.renderImage(4)}
                        {this.renderImage(5)}
                        {this.renderImage(6)}
                        {this.renderImage(7)}
                        {this.renderImage(8)}
                        {this.renderImage(9)}
                    </ScrollView>

                    <View style = {styles.bottomView}>
                        <Button 
                            title = "Cancel"
                            type="clear"
                            titleStyle = {{color: Color.SECONDARY}}
                            buttonStyle = {{width: 200}}
                            onPress = {() => { this.handleCancel(); }}/>

                        <Button 
                            title = "Confirm"
                            type="clear"
                            titleStyle = {{color: Color.SECONDARY}}
                            buttonStyle = {{width: 200}}
                            onPress = {() => {
                                this.setState({isSubmitting:true})
                                this.handleSubmit();
                            }}/>
                    </View>
                </View>
            )
        }
        return (
            <View></View>
        )
    }

    handleCancel(){
        this.props.navigation.goBack()
    }

    async handleSubmit(){
        await this.submitImages()
        this.setState({isSubmitting:false})
        this.props.navigation.goBack()
    }

    async submitImages(){
        token = await GoogleSignin.getTokens();
        description = 'test'
        for (i = 0; i < (this.state.count) ; i ++){
            uploadToken = await this.GoogleAPIHandler.getUploadToken(this.state.images[i], token)
            this.GoogleAPIHandler.submitImage(uploadToken, description, token);
        }
        console.log("Image Submitted");
    }

    renderImage(index){
        if (index < this.state.count){
            return (
                <View style = {{ alignItems: 'center', paddingBottom: 10}}>
                    <Image source={{uri: this.state.images[index].path}}
                            style={{width: 400, height: 400}} />
                </View>
            )
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
        backgroundColor: Color.PRIMARY
    },

    bottomView:{
		width: '100%', 
        height: 50, 
        flexDirection: 'row',
		backgroundColor: Color.PRIMARY,
		justifyContent: 'space-evenly', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
    },

    Text: {
        color: Color.SECONDARY,
    },
});
