import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'

import Swiper from 'react-native-swiper'
import { Color } from '../../../assets/Assets';

export default class PreviewComponent extends Component {
	static navigationOptions = {
		title: 'Preview Images',
		headerTintColor:  Color.SECONDARY,
		headerTitleStyle: {color: Color.SECONDARY, fontSize: 18},
	}

    constructor(){
		super()
    	this.state = { autoPlay: false }
	}
	
    render() {
		const images = this.props.navigation.getParam('images')
		const index = this.props.navigation.getParam('index')

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
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
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
	}
})