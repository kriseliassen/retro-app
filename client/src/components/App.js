import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Form from './Form.js';
import About from './About.js';
import '../styles/App.css'

const App = () => {
  return (
    <div className="App__container">
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/form' element={<Form />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
