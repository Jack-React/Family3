import React, {Component} from 'react'
import{ View, StyleSheet, Image, FlatList, SafeAreaView, Dimensions, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { Header, Left, Button as ButtonBase, Right, Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';


import { Color } from '../../assets/Assets'
import GoogleAPIHandler from '../../api/GoogleAPIHandler'

const IMAGE_WIDTH = Dimensions.get('window').width

export default class PreviewPage extends Component {
    constructor(){
        super();
        this.GoogleAPIHandler = GoogleAPIHandler.getInstance();
        this.state = {
            numColumns: 3,
            loadSingleImage: false,
            currentIndex: 0,
            isSubmiting: false
        }  
    }

    render() {
        images = this.props.navigation.getParam('images')        
        const { numColumns } = this.state;        
        return (
            <View style={styles.MainContainer}>
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
					<Right/>
				</Header>
                <SafeAreaView style = {{flex: 1, alignItems: 'flex-start'}}>
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
                     {this.state.isSubmiting? 
                    <View style = {styles.loading}>
                        <ActivityIndicator  
                        style = {styles.loading}
                        size="large" 
                        color={Color.DRAK_GREY}/>
                    </View>: null }
                </SafeAreaView>
                <View style = {styles.bottomView}>
                    <Button 
                        title = "Submit"
                        type="outline"
                        titleStyle = {{color: Color.SECONDARY}}
                        buttonStyle = {{width: 200}}
                        onPress = {() => {
                            this.setState({
                                isSubmiting: true
                            })
                            this.handleSubmit();
                    }}/>
                </View>
               
            </View>
        )
    }
    
    // Handles the event where submit button is pressed
    async handleSubmit(){
        // this.setState({isSubmitting:true})
        await this.submitImages()
        this.setState({isSubmitting:false})
        this.props.navigation.navigate('Album')
    }

    // Submits an image to google photo API
    async submitImages(){
        const images = this.props.navigation.getParam('images')
        const album = this.props.navigation.getParam('album')
        var datas = []
        for (i = 0; i < (images.length); i ++){
            uploadToken = await this.GoogleAPIHandler.getUploadToken(images[i])
            data = {
                uploadToken: uploadToken,
                description: images.description
            }
            datas.push(data)
        }
        await this.GoogleAPIHandler.submitImage(datas ,album.id);
        console.log("Image Submitted");
    }         
}

const styles = StyleSheet.create({
    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY,
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
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
		bottom: 10
    },

    loading: {
        backgroundColor: '#FFFFFF50',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})