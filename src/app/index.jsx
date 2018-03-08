import React from 'react';
import { render } from 'react-dom';

import './styles/lib/spectre.min.css';
import './styles/lib/specterAddOns.less';
import Designer from './imports/designer/Designer.jsx';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render () {
    return (
      <div>
        <Designer />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));