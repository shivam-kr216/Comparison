import React, { Component } from 'react';
import Form from './Components/Form';
import {Provider} from './Context';

class App extends Component{
  render(){
    return(
      <React.Fragment>
        <Provider>
          <Form></Form>
        </Provider>
      </React.Fragment>
    )
  };
}

export default App;
