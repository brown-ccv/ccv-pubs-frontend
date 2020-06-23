import React, { Component } from 'react';
import Navbar from './components/react-ccv-components/Navbar';
import Footer from './components/react-ccv-components/Footer';
import { BrowserRouter, Route} from 'react-router-dom';

// import components
import ContentPage from './components/ContentPage';
import AddPub from './components/AddPub';

class App extends Component {
  render() {
    return (
//nest routes; check for authentication with /secured; man add and add kick back to homepage
//logout
      <div aria-live = "polite" aria-busy = {this.props.loading}>
        <Navbar />
        <div className="App">
          <BrowserRouter>
            <div className="AddPub">
              <Route path="/addpub" component={AddPub} />
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
