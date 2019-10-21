import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, Image, Dimensions } from 'react-native'
import { Header, Left, Button as ButtonBase, Right, Body, Title, Form, Textarea } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';


import Swiper from 'react-native-swiper'
import { Color } from '../../../assets/Assets';

const SCREEN_WIDTH = Dimensions.get('window').width
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
				<Header style = {styles.headerContainer}>
					<StatusBar
						backgroundColor={Color.STATUS_BAR}
						barStyle="light-content"
					/>
					<Left>
						<ButtonBase
							transparent
							onPress={() => this.props.navigation.goBack()}
							>
							<Icon name="angle-left" size={20} color= {Color.PRIMARY}/>
						</ButtonBase>
					</Left>
					<Body>
						<Title style = {{color:Color.PRIMARY}}>{album.title}</Title>
					</Body>
					<Right style = {{paddingRight: 10}}>
					<ButtonBase
						transparent
						onPress={() => { this.props.navigation.goBack() }}
					>
						<Icon name="check" size={20} color= {Color.PRIMARY}/>
					</ButtonBase>
					</Right>
				</Header>
				<Swiper
				loadMinimalSize={3}
				style = {{paddingBottom: 50}}
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
									<Form style = {{width: SCREEN_WIDTH - 20}}>
										<Textarea 
										rowSpan={4} 
										bordered placeholder="Enter a description"
										onChangeText={(text) => { image.description = text}}
										value = {image.description}
										style={{}}/>
									</Form>
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
	
	headerContainer: {
        alignItems: 'flex-start',
		backgroundColor: Color.SECONDARY,
		width: '100%'
	},
	
    imageStyle: {
		flex: 1,
		paddingBottom:70,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: Color.PRIMARY
	},
	
	textContainer: {
		flex:1,
		paddingBottom:70,
		justifyContent: 'flex-start',
		alignSelf: 'flex-start',
		paddingTop: 10,
		paddingLeft: 10
	},

    textStyle: {
	  color: Color.BLACK,
	  fontSize: 15,
	  paddingLeft: 10
	}
})