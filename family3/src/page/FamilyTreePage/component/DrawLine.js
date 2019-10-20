import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Svg, { G, Path, Rect, Line, } from 'react-native-svg';


export default class DrawLine extends Component{
  constructor(props){
    super(props);

  }

  render(){
    var node1 = {x: this.props.x1, y:this.props.y1};
    var node2 = {x: this.props.x2, y:this.props.y2};
    var halfwayY = Math.abs(node1.y-node2.y) + node1.y// not sure whichone is ontop

    return(
      <View style={{position: 'absolute'}} >

      <Svg height="1000" width="1000">
        // <Line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} stroke="red" strokeWidth="2" />
        <Path
         d="M${node1.x} ${node1.y} V${halfwayY} H${node2.x} V${node2.y}"
         fill="none"
         stroke="red"
       />
      </Svg>
      </View>
    );
  }
}
