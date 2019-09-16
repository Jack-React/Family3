import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'

import Swiper from 'react-native-swiper'
import { Color } from '../../../assets/Assets';

export default class ImageSwiperComponent extends Component {
    constructor(){
		super()
    	this.state = {
			swiperOldIndex: 1,
			swiperCurrentIndex: 1,
			pageIndex: 0
		}
	}

    render() {
        return (
			<Swiper
				loadMinimalSize={0}
				index={1}
				loadMinimal
				showsPagination	= {false}
				onMomentumScrollEnd={(e, { index }, context) => this.updatePage(index)} >
				
				{this.renderScreenComponent()}
				{this.renderScreenComponent()}
				{this.renderScreenComponent()}
        	</Swiper>
        )
	}
	
	updatePage(index){
		this.setState({ swiperOldIndex: this.state.swiperCurrentIndex, swiperCurrentIndex: index }, () => {
			const direction = this.getSwipeDirection(this.state.swiperOldIndex, this.state.swiperCurrentIndex)
			let newPageIndex = (this.state.pageIndex + direction) % this.props.size
			if (newPageIndex < 0)
				newPageIndex = 0 
			this.setState({pageIndex: newPageIndex})
		})
	}

	renderScreenComponent(){
		const index = this.state.pageIndex;
		const mediaItems = this.props.images
		const mediaItem = mediaItems[index]
		return (	
			<View style={styles.imageStyle}>
				<Image source={{uri: mediaItem.baseUrl}}
						style={{width: '100%', height: '80%'}} />
				<View style = {styles.textContainer}>
					<Text style = {styles.textStyle}>{mediaItem.description}</Text>
				</View>	
	 		</View>
		)
	}

    getSwipeDirection(oldIndex, newIndex) {
		if (oldIndex === 0 && newIndex === 2) {
		  	return -1;
		} else if (oldIndex === 2 && newIndex === 0) {
		  	return 1;
		} else if (newIndex > oldIndex) {
		  	return 1;
		} else if (newIndex < oldIndex) {
		  	return -1;
		}
		return 0;
	}
}

const styles = StyleSheet.create({
    wrapper: {},
    imageStyle: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: Color.PRIMARY
	},
	
	textContainer: {
		flex:1,
		justifyContent: 'center',
		alignSelf: 'flex-start',
		paddingLeft: 20
	},

    textStyle: {
      color: Color.SECONDARY,
    }
})