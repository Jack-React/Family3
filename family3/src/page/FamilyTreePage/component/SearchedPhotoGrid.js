import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';

import { Color } from '../../../assets/Assets.js'
const IMAGE_WIDTH = Dimensions.get('window').width;
class ImageGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedImages: this.props.searchedImages,
      numColumns: 3,
     };
  }

  // componentDidMount() {
  //   // Build an array of 60 photos
  //   let items = Array.apply(null, Array(60)).map((v, i) => {
  //     return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
  //   });
  //   this.setState({ items });
  // }

  render() {
    const { numColumns,  searchedImages } = this.state;
    console.log('state is', this.state);
    console.log('width',IMAGE_WIDTH);
    console.log('width', IMAGE_WIDTH/this.state.numColumns - 6, 'height', IMAGE_WIDTH/this.state.numColumns - 6);
    return(
      <FlatList
          numColumns = {numColumns}
          data = {(searchedImages == null)? console.log(new Error('no image to display')): searchedImages}
          renderItem = {({item, index}) => {
              return(
                  <TouchableOpacity
                  activeOpacity= {0.5}
                  underlayColor= {Color.GREY}
                  >
                      <View style = {{ alignItems: 'center', paddingBottom: 2, paddingLeft: 2, paddingRight: 2}}>
                          <Image source={{uri: item.source.uri}}
                              style={{width: IMAGE_WIDTH/this.state.numColumns - 6, height: IMAGE_WIDTH/this.state.numColumns - 6}}/>
                      </View>
                  </TouchableOpacity>
              )
          }}
          keyExtractor={item => item.id}
      />
    );
  }



}

export default ImageGrid;
