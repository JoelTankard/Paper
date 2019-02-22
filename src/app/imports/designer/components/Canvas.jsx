import React from 'react';
import _ from 'lodash';
import d3 from 'd3';

import Obj from './Obj.jsx';
import ObjHover from './ObjHover.jsx';
import ObjSelect from './ObjSelect.jsx';

export default class Canvas extends  React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    }
    
    this.hover = this.hover.bind(this);
    this.select = this.select.bind(this);
  }


  hover(data){
    this.refs.objHover.hover(data)
  }
  select(data){
    this.refs.objSelect.select(data)
  }

  render () {
    let file = this.props.file;
    return (
        <div className="canvas">
            <div className="canvas-drawLayer abs-center-center">

                

                {/* Objects */}
                <div className="canvas-objectLayer">
                    {file.objects.map((object,index) => {
                        return (
                            <Obj key={'object-'+index} {...{ 
                                object: object, 
                                hover: this.hover,
                                select: this.select
                            }} />
                        )
                    })}  
                </div>   

                {/* Shows when object is clicked */}
                <ObjSelect ref="objSelect" {... this.props }/>

                {/* Shows when hovering over an object */}
                <ObjHover ref="objHover" />

                {/* Spreads */}
                {file.spreads.map((spread,index) => {
                    return (
                        <div key={'spread-'+index} className="spread">

                            {/* Pages */}
                            {(() => {
                                let pages = _.filter(file.pages, (page, index) => { return page.spreadId === spread.id });
                                return pages.map((page,index) => {
                                    return (
                                        <div key={'page-'+index} className="page"></div>
                                    )
                                })
                            })()}

                        </div>
                    )
                })}
                
            </div>
        </div>
    );
  }
}
