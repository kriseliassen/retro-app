import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './Profile.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import { actionCreators } from '../state';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

const App = () => {
  // const dispatch = useDispatch();
  // const { addUser } = bindActionCreators(actionCreators, dispatch);

  // const getUserData = async (token) => {
  //   let resp = await fetch('/db/user', {
  //     method: "GET",
  //     headers: { "Authorization": `Bearer ${token}` },
  //   })
  //   const user = await resp.json();
  //   console.log(user)
  //   addUser(user)
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem('retroToken')
  //   if (token) {
  //     console.log('LOCAL STORAGE CONTAINS TOKEN')
  //     getUserData(token)
  //   }
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
