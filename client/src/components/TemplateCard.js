import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const TemplateCard = ({template}) => {
  console.log('TEMPLATECARD', template)
  const {name, description} = template;
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleClickChoose = async () => {
    const token = localStorage.getItem('retroToken');
    await fetch('/db/teamstemplates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({templateName: name, teamId: user.user.team_id})
    })
  }
  const handleClickStart = async () => {
    navigate('/form');
  }


  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
      {
        user.user?.templates?.length > 0 
        ?<button onClick={handleClickStart}>Start Retro</button>
        :<button onClick={handleClickChoose}>Choose this</button>
      }
      
    </div>
  )
}

export default TemplateCard
