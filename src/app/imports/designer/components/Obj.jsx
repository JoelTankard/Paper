import React from 'react';

export default class Obj extends  React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    }
    this.getDimentions = this.getDimentions.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  getDimentions(){
    let dimentions = this.props.object.dimentions;
    let objBounding = this.refs.obj.getBoundingClientRect();
    let width = dimentions && dimentions.width ? dimentions.width : objBounding.width;
    let height = dimentions && dimentions.height ? dimentions.height : objBounding.height;
    let x = dimentions && dimentions.x ? dimentions.x : objBounding.offsetLeft;
    let y = dimentions && dimentions.y ? dimentions.y : objBounding.offsetTop;
 
    return {
      id: this.props.object.id,
      width: width,
      height: height,
      x: x,
      y: y
    }
  }

  onMouseEnter() {
    this.props.hover(this.getDimentions())
  }

  onMouseLeave(){
    this.props.hover({})
  }

  onClick(){
    this.props.select(this.getDimentions())
  }

  render () {
    let obj = this.props.object;
    let dimentions = obj.dimentions;
    let style = obj.style;
    let content = {};
    _.merge(style, {
      width: dimentions && dimentions.width ? dimentions.width : 'auto',
      height: dimentions && dimentions.height ? dimentions.height : 'auto',
      transform: 'translate(' + ( dimentions && dimentions.x ? dimentions.x : 0 ) + 'px ,' + ( dimentions && dimentions.y ? dimentions.y : 0 ) + 'px)'
    });
    //Change content based on type
    switch(obj.type){
      case 'text':
        content = obj.data.text
      break;
    }

    return (
        <div ref="obj" className="object" 
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onClick}
          style={style}>
            {content}
        </div>
    );
  }
}
