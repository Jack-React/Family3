import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'

import Swiper from 'react-native-swiper'
import { Color } from '../../../assets/Assets';

export default class ImageSwiperComponent extends Component {
    constructor(){
		super()
    	this.state = {
			autoPlay: false
		}
	}
	
	
    render() {
		const images = this.props.navigation.getParam('images')
		const index = this.props.navigation.getParam('index')
		
		return (
			<Swiper
				loadMinimalSize={3}
				index = {index}
				loadMinimal
				loop = {false}
				autoplay = {this.state.autoPlay}
				showsPagination	= {false}>
				{images.map((images) => {
					return(
						<View key={images.baseUrl} style={styles.imageStyle}>
							<Image source={{uri: images.baseUrl}}
									style={{width: '100%', height: 400}} />
							<View style = {styles.textContainer}>
								<Text style = {styles.textStyle}>{images.description}</Text>
							</View>	
						</View>
					)
				})}
        	</Swiper>
        )
	}
}

const styles = StyleSheet.create({
    imageStyle: {
		paddingTop: 30,
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: Color.PRIMARY
	},
	
	textContainer: {
		flex:1,
		justifyContent: 'center',
		alignSelf: 'center',
	},

    textStyle: {
	  color: Color.SECONDARY,
	  fontSize: 20
	}
})