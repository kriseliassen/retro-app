import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './Profile.js';
import SignUp from './SignUp.js';
import Login from './Login.js';

const App = ()=> {
  const [teams, setTeams] = useState([])
  const data = async () => {
    let resp = await fetch('/db/teams')
    const teams = await resp.json()
    setTeams(teams)
  }
  useEffect(()=>{data()},[])
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
