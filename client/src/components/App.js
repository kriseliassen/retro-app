import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import '../styles/App.css'

const App = () => {
  return (
    <div className="App__container">
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
