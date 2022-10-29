import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies()

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = "X-CSRFToken"
// axios.defaults.headers.common['X-CSRFToken'] = cookies["csfttoken"];


function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/' element={<Login/>} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;
