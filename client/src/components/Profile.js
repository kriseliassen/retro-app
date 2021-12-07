import React , { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import { useNavigate } from 'react-router-dom';
import JoinTeam from './JoinTeam';
import CreateTeam from './CreateTeam';
import TemplateCard from './TemplateCard';
import { fetchUser } from '../state/actionCreators';
import '../styles/Profile.css'
import '../styles/selectTeam.css'

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
        headers: { 
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        },
      });
      const teamData = await response.json();
      setTeams(teamData)
    } catch(err) {
      console.log(err)
    }
  }

  const getTemplates = async token => {
    try  {
      console.log('GET TEMPLATES', user?.user?.team_id)
      const response = await fetch(`${SERVER_URL}/db/templates`, {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'teamid': user?.user?.team_id
         },
      });
      const templatesData = await response.json();
      setTemplates(templatesData)
    } catch (err) {
      console.log(err)
    }
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
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('retroToken');
    const customTemplate = templates.some(t => t.name === user.user?.templates[0]);
    
    if (templates.length === 0 || !customTemplate) {
      getTemplates(token);
    }
  }, [templates])

  const chosenFormData = user.user?.templates?.length > 0 
    ? templates?.find(item => item.name === user.user?.templates[0])
    : null;

  return (
    <div className="Profile__container">
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
     {(user.user?.team_name == null && teams.length > 0) 
     && (
      <>
      <JoinTeam teams={teams} />
      <p className="Profile__text--or">or</p>
      </>
     )}
      {(user.user?.team_name == null) && <CreateTeam />}

      {(user.user?.templates?.length === 0 
        && user.user?.team_name) 
      && 
      <div className="Profile__TemplateCardsContainer">
        <p className="Profile__TemplateCardsContainer--header">
          There are no retro forms associated with your team. Please create a new template
        </p>
        <button 
          onClick={() => navigate('/newtemplate')} className="btn--form">
            Create your own template
        </button>
        <p className="Profile__TemplateCardsContainer--header">
            Or choose a predefined template from the list below
        </p>
        {templates.map(item => (<TemplateCard template={item} key={item.name} />))}
      </div>
      }
      {chosenFormData && 
      <div className="Profile__TemplateCardsContainer">
        <p className="Profile__text--chosen-form">
          Your team's form
        </p>
        <TemplateCard template={chosenFormData} />
      </div>
      }
    </div>
  )
}

export default Profile
