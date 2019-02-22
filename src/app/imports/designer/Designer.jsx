import React from 'react';
import '../../styles/designer/designer.less';

import Canvas from './components/Canvas.jsx';

export default class Designer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //Tempory
      file: {
        title: '1',
        spreads: [ { id: 'spread1' } ],
        pages: [ { id:'page1', spreadId: 'spread1' }, { id:'page2', spreadId: 'spread1' } ],
        objects: [
          { 
            id: 'object1', 
            spreadId: 'spread1',
            pageId: 'page1',
            type: 'text',
            dimentions: {
              x: 40,
              y: 60
            },
            style: {
              fontFamily: 'san-serif',
              color: '#000',
              fontSize: 24
            },
            data: {
              text: 'Hello world',              
            }
          },
          { 
            id: 'object2', 
            spreadId: 'spread1',
            pageId: 'page1',
            type: 'text',
            dimentions: {
              x: 70,
              y: 160
            },
            style: {
              fontFamily: 'san-serif',
              color: '#FF0000',
              fontSize: 24
            },
            data: {
              text: 'Hello world',              
            }
          }  
        ]
      }
    }

    this.updateFile = this.updateFile.bind(this);
  }

  updateFile(file){
    this.setState({
      file: file
    })
  }

  render () {
    return (
      <div className="designer"> 
          <Canvas {...{ file: this.state.file, updateFile: this.updateFile }} />
      </div>
    );
  }
}
