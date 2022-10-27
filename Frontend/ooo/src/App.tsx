import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <Routes>
          <Route path='/' element={<h1>First page</h1>} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;
