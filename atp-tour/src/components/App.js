import React from 'react';
import { Route, Routes , BrowserRouter } from "react-router-dom";
import Login from './login/Login';
import Header from './navigation/Header';
import './App.css';
import Registration from './registration/Registration';

const App = ()=>{
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/register" element={<Registration/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
