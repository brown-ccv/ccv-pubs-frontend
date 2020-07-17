import React, { Component } from "react";
import Navbar from "./components/react-ccv-components/Navbar";
import Footer from "./components/react-ccv-components/Footer";
import { BrowserRouter, Route } from "react-router-dom";

// import components
import ContentPage from "./components/ContentPage";
import AddPub from "./components/AddPub";

class App extends Component {
  render() {
    return (
      <div aria-live="polite" aria-busy={this.props.loading}>
        <Navbar />
        <div className="App">
          <BrowserRouter>
            <main>
              <div className="AddPub">
                <Route path="/addpub" component={AddPub} />
              </div>
              <Route exact path="/" component={ContentPage} />
            </main>
          </BrowserRouter>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
