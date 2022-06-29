import React from 'react';
import { Route, Routes , BrowserRouter } from "react-router-dom";
import Login from './login/Login';
import Header from './navigation/Header';
import Footer from './navigation/Footer';
import './App.css';

const App = ()=>{
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route exact path="/" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
