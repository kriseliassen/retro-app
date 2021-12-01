import React , { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import JoinTeam from './JoinTeam';
import CreateTeam from './CreateTeam';
import TemplateCard from './TemplateCard';
import { fetchUser } from '../state/actionCreators';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [templates, setTemplates] = useState([]);

  const getTeams = async token => {
    const response = await fetch('/db/teams', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }});
    const teamData = await response.json();
    setTeams(teamData)
  }

  const getTemplates = async token => {
    const response = await fetch('/db/templates', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }});
    const templatesData = await response.json();
    setTemplates(templatesData)
  }

  const logOut = () => {
    localStorage.removeItem('retroToken')
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('retroToken');
    if(!token) {
      navigate('/login')
      return;
    } else if (!user.user) {
      dispatch(fetchUser(token))
    } 
    getTeams(token);
    getTemplates(token);
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
      {user.user?.templates?.length > 0? `HAS TEMPLATE ${user.user.templates[0]}` : "NO TEMPLATES"}
      {(templates?.length > 0 && user.user?.templates?.length === 0) && templates.map(item => (<TemplateCard template={item}/>))}
    </div>
  )
}

export default Profile
