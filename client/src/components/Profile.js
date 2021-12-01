import React , { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import JoinTeam from './JoinTeam';
import CreateTeam from './CreateTeam';
import { fetchUser } from '../state/actionCreators';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);

  const getTeams = async token => {
    const response = await fetch('/db/teams', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }});
    const teamData = await response.json();
    setTeams(teamData)
  }

  const logOut = () => {
    localStorage.removeItem('retroToken')
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('retroToken')
    if(!token) {
      navigate('/login')
    } else if (!user.user) {
      dispatch(fetchUser(token))
      getTeams(token)
    }
  }, []);

  return (
    <div>
      <button onClick={logOut}>Log out</button>
      Profile
      {user.user && <h1>Hello, {user.user?.first_name}</h1>}
      {user.user?.team_name && <p>Your team is {user.user.team_name}</p>}
      {user.user?.team_name === null && <p>You are not assigned to a team. Please join a team or create a new team.</p>}
      <JoinTeam teams={teams} />
      {/* {(teams && user.user?.team_name == null) && <JoinTeam teams={teams} />} */}
      {(user.user?.team_name == null) && <CreateTeam />}
    </div>
  )
}

export default Profile
