import React, { Component } from 'react';
import Navbar from './components/react-ccv-components/Navbar';
import Footer from './components/react-ccv-components/Footer';
import { BrowserRouter, Route} from 'react-router-dom';

// import components
import AboutPage from './components/AboutPage';
import ContentPage from './components/ContentPage';
import AddPub from './components/AddPub';
import ManualAdd from './components/ManualAdd';
import DoiInfo from './components/DoiInfo';

class App extends Component {
  render() {
    return (
//nest routes; check for authentication with /secured; man add and add kick back to homepage
//logout
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
              <div className = "DoiInfo">
              <Route path="/doiinfo" component={DoiInfo} />
              </div>
            <div className="main-content">
              <Route exact path="/" component={ContentPage} />
            </div>
            
          </BrowserRouter>
          <Footer />
        </div>
        

      </div>

    );
  }
}

export default App;
