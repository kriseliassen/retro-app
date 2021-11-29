import React , { useEffect }from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';


const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  console.log(user)
  return (
    <div>
      Profile
      {user.user && <h1>Hello, {user.user.name}</h1>}
    </div>
  )
}

export default Profile
