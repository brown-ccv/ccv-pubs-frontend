import React from "react";
import Navbar from "./components/react-ccv-components/Navbar";
import Footer from "./components/react-ccv-components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ContentPage } from "./components/ContentPage";
import AddPub from "./components/AddPub";

export function App() {
  return (
    <div aria-live="polite">
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