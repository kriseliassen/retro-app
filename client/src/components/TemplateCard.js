import React from 'react'
import { useSelector } from 'react-redux';


const TemplateCard = ({template}) => {
  const {name, description} = template;
  const user = useSelector(state => state.user);

  const handleClick = async () => {
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

  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
      <button onClick={handleClick}>Choose this</button>
    </div>
  )
}

export default TemplateCard
