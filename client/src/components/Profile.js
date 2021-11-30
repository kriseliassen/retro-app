import React , { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import JoinTeam from './JoinTeam';
import CreateTeam from './CreateTeam';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addUser } = bindActionCreators(actionCreators, dispatch);
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    const response = await fetch('/db/teams');
    const teamData = await response.json();
    setTeams(teamData)
  }

  const logOut = () => {
    localStorage.removeItem('retroToken')
    navigate('/login')
  }

  const getUserData = async (token) => {
    let resp = await fetch('/db/user', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
    const userData = await resp.json();
    if (userData.error) {
      console.log(userData.error)
      logOut();
      return;
    }
    addUser(userData)
  }

  useEffect(() => {
    getTeams()
    const token = localStorage.getItem('retroToken')
    if(!token) {
      navigate('/login')
    } else if (!user.user) {
      getUserData(token)
    }
    console.log('test')
  }, [user]);

  console.log('STATE', user)
  return (
    <div>
      <button onClick={logOut}>Log out</button>
      Profile
      {user.user && <h1>Hello, {user.user?.first_name}</h1>}
      {user.user?.team_name && <p>Your team is {user.user.team_name}</p>}
      <JoinTeam teams={teams} />
      {/* {(teams && user.user?.team_name == null) && <JoinTeam teams={teams} />} */}
      {(user.user?.team_name == null) && <CreateTeam />}
    </div>
  )
}

export default Profile
