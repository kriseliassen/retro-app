import React, { useState, useEffect } from 'react'

const App = ()=> {
  const [teams, setTeams] = useState([])
  const data = async () => {
    let resp = await fetch('/db/teams')
    const teams = await resp.json()
    console.log(teams)
    setTeams(teams)
  }
useEffect(()=>{data()},[])
  return (
    <div className="App">
      <p>Retro App: final project</p>
      {teams?.map(i=>(<p>{i.name}</p>))}
    </div>
  );
}

export default App;
