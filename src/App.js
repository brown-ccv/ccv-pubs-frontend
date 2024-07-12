import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/react-ccv-components/Navbar.tsx';
import Footer from './components/react-ccv-components/Footer';
import { ContentPage } from './components/ContentPage';
import { PublicationsProvider } from './utils/PublicationsContext.tsx';
import { useAuthStateChanged } from './utils/firebase.ts';

export function App() {
  useAuthStateChanged();

  return (
    <PublicationsProvider>
      <div aria-live="polite">
        <Navbar />
        <BrowserRouter>
          <main className="main">
            <Routes>
              <Route exact path="/" element={<ContentPage />} />
            </Routes>
          </main>
        </BrowserRouter>
        <Footer />
      </div>
    </PublicationsProvider>
  );
}
