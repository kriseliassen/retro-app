import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../state/actionCreators';
import '../styles/TemplateCard.css'


const TemplateCard = ({template}) => {
  const {name, description} = template;
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickChoose = async () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const token = localStorage.getItem('retroToken');
    await fetch(`${SERVER_URL}/db/teamstemplates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({templateName: name, teamId: user.user.team_id})
    })
    const updatedUser = {...user };
    updatedUser.user.templates = [name];
    dispatch(addUser(updatedUser));
  }

  const handleClickStart = async () => {
    navigate('/form');
  }


  return (
    <div className="TemplateCard__container">
      <p className="TemplateCard__name">{name}</p>
      <p className="TemplateCard__description">{description}</p>
      {
        user.user?.templates?.length > 0 
        ?<button onClick={handleClickStart} className="btn--form ">Start Retro</button>
        :<button onClick={handleClickChoose} className="btn--form rightaligned">Choose this</button>
      }
    </div>
  )
}

export default TemplateCard
