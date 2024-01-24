import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/react-ccv-components/Navbar';
import Footer from './components/react-ccv-components/Footer';

import { ContentPage } from './components/ContentPage';

export function App() {
  return (
    <div aria-live="polite">
      <Navbar />
      <div className="App">
        <BrowserRouter>
          <main>
            <Routes>
              <Route exact path="/" element={<ContentPage />} />
            </Routes>
          </main>
        </BrowserRouter>
        <Footer />
      </div>
    </div>
  );
}
