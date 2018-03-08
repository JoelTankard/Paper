import React from 'react';
import _ from 'lodash';
import d3 from 'd3';

import '../../../styles/designer/components/objHover.less';

export default class Obj extends  React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        dimentions: {
          width: 0,
          height: 0,
          transform: 'translate(0,0)'
        },
        hover:false
    }
    this.hover = this.hover.bind(this);
  }

  hover(data){
    let setState = {};
    if(data && !this.state.hover){
      setState = {
        dimentions: {
          width: data.width,
          height: data.height,
          transform: 'translate(' + data.x + 'px,' + data.y + 'px)'
        },
        hover: true
      }
    }else{
      setState = {
          dimentions: {
            width: 0,
            height: 0,
            transform: 'translate(0,0)'            
          },
          hover: false
        }
    }
    this.setState(setState);
  }

  render () {
    return (
        <div className={"objHover" + (this.state.hover ? ' show' : '')} style={this.state.dimentions}></div>
    );
  }
}
