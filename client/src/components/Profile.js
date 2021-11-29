import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div>
      Profile
      {user.name && <h1>Hello, {user.name}</h1>}
    </div>
  )
}

export default Profile
