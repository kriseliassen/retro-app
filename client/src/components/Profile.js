import React , { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addUser } = bindActionCreators(actionCreators, dispatch);

  const logOut = () => {
    localStorage.removeItem('retroToken')
    navigate('/login')
  }

  const getUserData = async (token) => {
    let resp = await fetch('/db/user', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
    const user = await resp.json();
    addUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('retroToken')
    if(!token) {
      navigate('/login')
    } else {
      getUserData(token)
    }
  }, []);

  return (
    <div>
      <button onClick={logOut}>Log out</button>
      Profile
      {user.user ? <h1>Hello, {user.user.name}</h1> : ''}
    </div>
  )
}

export default Profile
