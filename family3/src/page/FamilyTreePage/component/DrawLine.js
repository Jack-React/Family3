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
    var halfwayY = Math.abs(node1.y-node2.y)/2;// not sure whichone is ontop
    // var d = "M${node1.x} ${node1.y} V${halfwayY} H${node2.x} V${node2.y}"
    var d = "M " + node1.x + " "+ node1.y +" v " + halfwayY + " H " + node2.x + " v " + halfwayY

    return(
      <View style={{position: 'absolute'}} >

      <Svg height="1000" width="1000">
        <Path
         d={d}
         fill="none"
         stroke="red"
       />
      </Svg>
      </View>
    );
  }
}
