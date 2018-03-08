import React from 'react';
import _ from 'lodash';
import * as d3 from "d3";

import '../../../styles/designer/components/objSelect.less';

let coords = {
  x: 0,
  y: 0
}

export default class Obj extends  React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        selected:false,
        mouseDown: false
    }
    this.select = this.select.bind(this);
    this.drag = this.drag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }


  componentDidMount(){
    let objSelect = d3.select(this.refs["objSelect"]);
    objSelect.on('touchStart', (d) => {
      coords.x = d3.event.touches[0].clientX;
      coords.y = d3.event.touches[0].clientY;
    }).on("touchmove", () => {
      this.onDrag();
    }).on("touchend", () => {
        this.endDrag();
    });
    objSelect.call(this.drag());
    window.addEventListener('mouseup', () => {
      if(this.state.selected && !this.state.mouseDown){
        this.select({});        
      }else{
        this.onMouseUp();
      }
    });
  }
  
  onDrag(){
    let x = 0;
    let y = 0;
    if(d3.event.touches){
      x = d3.event.touches[0].clientX - coords.x;
      y = d3.event.touches[0].clientY - coords.y;
    }else{
      x = this.state.x + d3.event.dx;
      y = this.state.y + d3.event.dy;
    }
    this.setState({
      x: x,
      y: y
    },() => {
      _.filter(this.props.file.objects, (object, index) => {
        if(object.id === this.state.id){
          object.dimentions.x = x;
          object.dimentions.y = y;
        }
      });

      console.log(this.props.file)
      
    });
  }

  endDrag(){

  }

  drag() {
    const dragEvent = d3.drag()
    .on("drag", () => {
        this.onDrag();
    })
    .on('end', () => {
        this.endDrag();
    })
    return dragEvent;
}

  onMouseDown(){
    this.setState({ mouseDown: true })
  }

  onMouseUp(){
    this.setState({ mouseDown: false })
  }
  

  select(data){
    let setState = {};
    if(data && !this.state.selected){
      setState = {
        id: data.id,
        width: data.width,
        height: data.height,
        x: data.x,
        y: data.y,
        selected: true
      }
    }else{
      setState = {
        id: '',        
        width: 0,
        height: 0,
        x: 0,
        y: 0,         
        selected: false
      }
    }
    this.setState(setState);
  }

  render () {
    let style = {
      width: this.state.width,
      height: this.state.height,
      transform: 'translate(' + this.state.x + 'px,' + this.state.y + 'px)'
    }
    return (
        <div ref="objSelect" className={"objSelect" + (this.state.selected ? ' show' : '')}
          onMouseDown={this.onMouseDown}
          style={style}>
          <div className="dragNode abs-left-top"></div>
          <div className="dragNode abs-center-top"></div>
          <div className="dragNode abs-right-top"></div>
          <div className="dragNode abs-left-center"></div>
          <div className="dragNode abs-right-center"></div>
          <div className="dragNode abs-left-bottom"></div>
          <div className="dragNode abs-center-bottom"></div>
          <div className="dragNode abs-right-bottom"></div>
        </div>
    );
  }
}
