import React, {Component} from 'react'
import{ View, StyleSheet, Image, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import { GoogleSignin } from 'react-native-google-signin';
import { Color } from '../../assets/Assets'

const IMAGE_WIDTH = Dimensions.get('window').width

export default class PreviewPage extends Component {
    constructor(){
        super();
        this.state = {
            numColumns: 3,
            loadSingleImage: false,
            currentIndex: 0
        }  
    }

    render() {
        const images = this.props.navigation.getParam('images')
        const { numColumns } = this.state;
        return (
            <View style={styles.MainContainer}>
                <SafeAreaView style = {{flex: 1, alignItems: 'center'}}>
                    <FlatList
                        numColumns = {numColumns}
                        data = {images}
                        renderItem = {({item, index}) => {
                            return(
                                <TouchableOpacity
                                activeOpacity= {0.5}
                                underlayColor= {Color.GREY}
                                onPress={() => {this.props.navigation.navigate('SingleImagePreview', {images, index})}}>
                                    <View style = { styles.imageStyle }>
                                        <Image source={{uri: item.path}}
                                            style={{width: IMAGE_WIDTH/this.state.numColumns - 6, height: IMAGE_WIDTH/this.state.numColumns - 6}}/>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item.path} 
                    />
                        
                </SafeAreaView>
                <View style = {styles.bottomView}>
                    <Button 
                        title = "Submit"
                        type="clear"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: 200}}
                        onPress = {() => {
                            this.handleSubmit();
                    }}/>
                </View>
            </View>
        )
    }
    
    // Handles the event where submit button is pressed
    async handleSubmit(){
        await this.submitImages()
        this.setState({isSubmitting:false})
        this.props.navigation.goBack()
    }

    // Submits an image to google photo API
    async submitImages(){
        token = await GoogleSignin.getTokens();
        description = 'test'
        for (i = 0; i < (this.state.count) ; i ++){
            uploadToken = await this.GoogleAPIHandler.getUploadToken(this.state.images[i], token)
            this.GoogleAPIHandler.submitImage(uploadToken, description, token);
        }
        console.log("Image Submitted");
    }         
}

const styles = StyleSheet.create({
    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    imageStyle: {
        alignItems: 'center',
        paddingBottom: 2, 
        paddingLeft: 2, 
        paddingRight: 2
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

})