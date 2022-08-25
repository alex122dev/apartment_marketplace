import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { SpecificApartmentPage } from './pages/SpecificApartmentPage/SpecificApartmentPage';
import './globalStyles/app.scss';

function App() {



  return (
    <div className="app">
      <Routes>
        <Route path='/apartments'>
          <Route path='' element={<HomePage />} />
          <Route path=':apartmentId' element={<SpecificApartmentPage />} />
        </Route>
        <Route path='/*' element={<Navigate to='/apartments' />} />
      </Routes>
    </div>
  );
}

export default App;