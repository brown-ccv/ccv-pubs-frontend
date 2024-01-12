import React, { Component } from "react";
import Navbar from "./components/react-ccv-components/Navbar";
import Footer from "./components/react-ccv-components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
              <Routes>
                <Route path="/addpub" className="AddPub" element={<AddPub />} />
                <Route exact path="/" element={<ContentPage />} />
              </Routes>
            </main>
          </BrowserRouter>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
