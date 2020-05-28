import React, { Component } from 'react';
import Navbar from 'react-brownccv/dist/components/Navbar';
import BrownFooter from 'react-brownccv/dist/components/BrownFooter';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// import components
import AboutPage from './components/AboutPage';
import ContentPage from './components/ContentPage';
import AddPub from './components/AddPub';
import ManualAdd from './components/ManualAdd';
import UserInfo from './components/UserInfo';

class App extends Component {
  render() {
    return (

      <div>
        <Navbar />
        <div className="App">
          <BrowserRouter>
            <div className="AddPub">
              <Route path="/addpub" component={AddPub} />
            </div>
            <div className = "ManualAdd">
              <Route path="/manualadd" component={ManualAdd} />
              </div>
              <div className = "UserInfo">
              <Route path="/userInfo" component={UserInfo} />
              </div>
            <div className="main-content">
              <Route exact path="/" component={ContentPage} />
            </div>
            
          </BrowserRouter>
          <BrownFooter />
        </div>
        

      </div>

    );
  }
}

export default App;
