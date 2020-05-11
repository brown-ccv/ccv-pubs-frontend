import React, { Component } from 'react';
import Navbar from 'react-brownccv/dist/components/Navbar';
import BrownFooter from 'react-brownccv/dist/components/BrownFooter';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// import components
import AboutPage from './components/AboutPage';
import ContentPage from './components/ContentPage';
import Secured from './components/Secured';
import AddPub from './components/AddPub';
import ManualAdd from './components/ManualAdd';

class App extends Component {
  render() {
    console.log("Public URL");
    console.log(`${process.env.PUBLIC_URL}`);
    return (

      <div>
        <Navbar />
        <div className="App">
          <BrowserRouter>
            <div className="container">
              <Route path="/secured" component={Secured} />
            </div>
            <div className="container">
              <Route path="/addpub" component={AddPub} />
            </div>
            <div className="main-content">
              <Route exact path="/" component={ContentPage} />
              {/* <ContentPage /> */}
            </div>
              <Route path="/manualadd" component={ManualAdd} />
          </BrowserRouter>
          <BrownFooter />
        </div>
        

      </div>

    );
  }
}

export default App;
