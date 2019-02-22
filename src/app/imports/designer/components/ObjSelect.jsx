import React from 'react';
import _ from 'lodash';
import * as d3 from "d3";
import * as fileUtils from '../utils/fileUtils.jsx';

import '../../../styles/designer/components/objSelect.less';

//Resize nodes for object selection
export class ResizeNode extends  React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mouseDown: false,
      startX: 0,
      startY: 0,
      objX: 0,
      objY: 0,
      objWidth: 0,
      objHeight: 0,
    }
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  componentDidMount(){
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount(){
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseDown(event){
    if(!this.state.mouseDown){ 
      console.log('ghk')
      
      this.setState({
        startX: event.pageX,
        startY: event.pageY,
        objX: this.props.objX,
        objY: this.props.objY,
        objWidth: this.props.objWidth,
        objHeight: this.props.objHeight,
        mouseDown: true
      }) 
    }
  }

  onMouseUp(){
    if(this.state.mouseDown){ 
      this.setState({ mouseDown: false }) 
    }
  }

  //Dragging Resize Node
  onMouseMove(event){
    if(this.state.mouseDown){
      let x = event.pageX - this.state.startX;
      let y = event.pageY - this.state.startY;
      let objWidth = this.state.objWidth;
      let objHeight = this.state.objHeight;    
      let objX = this.state.objX;
      let objY = this.state.objY;
  
      console.log({
        objX, x, objY, y, objWidth, objHeight
      })
  
      
      switch ( this.props.x ){
        case 'left':
          objX += x;  
          objWidth -= x;      
        break;
        case 'right':
          objWidth += x;
        break;
      }
  
      switch ( this.props.y ){
        case 'top':
          objY += y;
          objHeight -= y;
        break;
        case 'bottom':
          objHeight += y;
        break;
      }
  
      this.props.updateDimentions({
        width: objWidth,
        height: objHeight,
        x: objX,
        y: objY
      });         
    }
  }

  render(){
    return (
      <div ref="resizeNode" onMouseDown={this.onMouseDown} className={"dragNode abs-" + (this.props.x) + "-" + (this.props.y)}></div>
    )
  }
}


// Object Selection
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
    this.objectDrag = this.objectDrag.bind(this);
    this.onObjectDrag = this.onObjectDrag.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.updateDimentions = this.updateDimentions.bind(this);
  }


  componentDidMount(){
    //Drag Event for moving object
    let objSelect = d3.select(this.refs.objSelect);
    objSelect.call(this.objectDrag());


    //Deselecteding object on mouse click
    window.addEventListener('mouseup', () => {
      if(this.state.selected && !this.state.mouseDown){
        this.select({});        
      }else{
        this.onMouseUp();
      }
    });
  }

  //Dragging Object
  onObjectDrag(){
    console.log('drag')
    let x = 0;
    let y = 0;
      x = this.state.x + d3.event.dx;
      y = this.state.y + d3.event.dy;
    this.updateDimentions({
      x: x,
      y: y
    });
  }

  objectDrag() {
    const dragEvent = d3.drag()
    .on("drag", () => {
        this.onObjectDrag();
    });
    return dragEvent;
  }

  onMouseDown(event){
    this.setState({ mouseDown: true })
  }

  onMouseUp(event){
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

  updateDimentions(dimentionsData){
    this.setState(dimentionsData)
    this.props.updateFile(fileUtils.updateObject(this.props.file,this.state.id,{
      dimentions: dimentionsData
    }));
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
            <ResizeNode x="left" y="top" {... this.props } {...{ objWidth: this.state.width, objHeight: this.state.height, objX: this.state.x, objY: this.state.y, updateDimentions: this.updateDimentions }} />
            <ResizeNode x="center" y="top" {... this.props } {...{ objWidth: this.state.width, objHeight: this.state.height, objX: this.state.x, objY: this.state.y, updateDimentions: this.updateDimentions }} />
            <ResizeNode x="right" y="top" {... this.props } {...{ objWidth: this.state.width, objHeight: this.state.height, objX: this.state.x, objY: this.state.y, updateDimentions: this.updateDimentions }} />
            <ResizeNode x="right" y="center" {... this.props } {...{ objWidth: this.state.width, objHeight: this.state.height, objX: this.state.x, objY: this.state.y, updateDimentions: this.updateDimentions }} />
            <ResizeNode x="left" y="center" {... this.props } {...{ objWidth: this.state.width, objHeight: this.state.height, objX: this.state.x, objY: this.state.y, updateDimentions: this.updateDimentions }} />
            <ResizeNode x="left" y="bottom" {... this.props } {...{ objWidth: this.state.width, objHeight: this.state.height, objX: this.state.x, objY: this.state.y, updateDimentions: this.updateDimentions }} />
            <ResizeNode x="center" y="bottom" {... this.props } {...{ objWidth: this.state.width, objHeight: this.state.height, objX: this.state.x, objY: this.state.y, updateDimentions: this.updateDimentions }} />
            <ResizeNode x="right" y="bottom" {... this.props } {...{ objWidth: this.state.width, objHeight: this.state.height, objX: this.state.x, objY: this.state.y, updateDimentions: this.updateDimentions }} />
        </div>
    );
  }
}
