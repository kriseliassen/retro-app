import React , { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import JoinTeam from './JoinTeam';
import CreateTeam from './CreateTeam';
import TemplateCard from './TemplateCard';
import { fetchUser } from '../state/actionCreators';
import '../styles/Profile.css'

const Profile = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [templates, setTemplates] = useState([]);

  const getTeams = async token => {
    try {
      const response = await fetch(`${SERVER_URL}/db/teams`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }});
      const teamData = await response.json();
      setTeams(teamData)
    } catch(err) {
      console.log(err)
    }
  }

  const getTemplates = async token => {
    try  {
      const response = await fetch(`${SERVER_URL}/db/templates`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }});
      const templatesData = await response.json();
      setTemplates(templatesData)
    } catch (err) {
      console.log(err)
    }
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
  }, [user]);

  const chosenFormData = user.user?.templates?.length > 0 
    ? templates.find(item => item.name === user.user?.templates[0])
    : null;

  return (
    <div className="Profile__container">
      <button 
        onClick={logOut}
        className="btn--logout">
        Log out
      </button>
      <p className="Profile__header">My profile</p>
      {user.user 
        && <h1 className="Profile__greeting">Hello, {user.user?.first_name}</h1>
      }
      {user.user?.team_name 
        && <p className="Profile__team">Team {user.user.team_name}</p>
      }
      {user.user?.team_name === null 
        && <p className="Profile__noteam">You are not assigned to a team. Please join a team or create a new team.</p>
      }
     {(user.user?.team_name == null && teams.length > 0) && <JoinTeam teams={teams} />}
      {(user.user?.team_name == null) && <CreateTeam />}

      {(templates?.length > 0 && user.user?.templates?.length === 0 && user.user?.team_name !== null) && 
      <div className="Profile__TemplateCardsContainer">
        <p className="Profile__TemplateCardsContainer--header">
          Please choose a retro template for your team
        </p>
        {templates.map(item => (<TemplateCard template={item} key={item.name} />))}
      </div>
      }
      {chosenFormData && 
      <div className="Profile__TemplateCardsContainer">
        <TemplateCard template={chosenFormData} />
      </div>
      }
    </div>
  )
}

export default Profile
