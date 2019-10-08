import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { Button as ButtonBase } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';


import Swiper from 'react-native-swiper'
import { Color } from '../../../assets/Assets';

export default class PreviewComponent extends Component {
	static navigationOptions = {
		title: 'Preview Images',
		headerTintColor:  Color.SECONDARY,
		headerTitleStyle: {color: Color.SECONDARY, fontSize: 18},
		headerRight: (
			<ButtonBase
					transparent
					onPress={() => this.handleSubmit()}
					>
					<Icon name="check" size={20} color= {Color.SECONDARY}/>
			</ButtonBase>
		)
	}
    constructor(){
		super()
    	this.state = {
			autoPlay: false
		}
	}
	
	
    render() {
		const images = this.props.navigation.getParam('images')
		const index = this.props.navigation.getParam('index')

		console.log(images)
		return (
			<View style = {styles.MainContainer}>
				<Swiper
					loadMinimalSize={3}
					index = {index}
					loadMinimal
					loop = {false}
					autoplay = {this.state.autoPlay}
					showsPagination	= {false}>
					{images.map((image) => {
						return(
							<View key={image.path} style={styles.imageStyle}>
								<Image source={{uri: image.path}}
										style={{width: '100%', height: 400}} />
								<View style = {styles.textContainer}>
									<Text style = {styles.textStyle}>Description:</Text>
									<TextInput
										placeholder="Image Description"
										style={styles.textStyle}
										onChangeText={text => image.description = text}
										value={image.description}
									/>
								</View>	
							</View>
						)
					})}
				</Swiper>
			</View>
        )
	}

	// This function handles the event where submit button is pressed
	async handleSubmit(){
        await this.submitImages()
        this.setState({isSubmitting:false})
        this.props.navigation.goBack()
    }

	// Submits the images to google photos
    async submitImages(){
		token = await GoogleSignin.getTokens();
		const {images} = this.state;
        for (i = 0; i < (this.state.count) ; i ++){
            uploadToken = await this.GoogleAPIHandler.getUploadToken(images[i], token)
            this.GoogleAPIHandler.submitImage(uploadToken, images[i].description, token);
        }
        console.log("Image Submitted");
    }
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
	},
	
	headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY
	},
	
    imageStyle: {
		paddingTop: 30,
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: Color.PRIMARY
	},
	
	textContainer: {
		flex:1,
		justifyContent: 'flex-start',
		alignSelf: 'flex-start',
		paddingTop: 10,
		paddingLeft: 10
	},

    textStyle: {
	  color: Color.BLACK,
	  fontSize: 15,
	//   justifyContent: 'flex-start',
	//   alignItems: 'flex-start'
	}
})