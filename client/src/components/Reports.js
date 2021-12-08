import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../state/actionCreators';
import {BiArrowBack} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import '../styles/Reports.css'
import SwitchToggle from './SwitchToggle';

const Reports = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([])
  const [output, setOutput] = useState([])
  const [showTeam, setShowTeam] = useState(true)

  const getEntries = async (token) => {
    const resp = await fetch(`${SERVER_URL}/db/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        team_id: user?.user?.team_id
      })
    })
    const rawEntries = await resp.json()
    setEntries(rawEntries.reports)
  }
  const allIndividualTeamEntries = () => {
    const data = showTeam ? [...entries] : [...entries.filter(item => {
      return item.user_id === user.user.id
    })];
    const differentEntries = []
    const questionsSets = []
    data.forEach(i => {
      if (differentEntries.includes(i.entries_id)) {
        return
      } else {
        differentEntries.push(i.entries_id)
      }
    })
    differentEntries.forEach(i => {
      let arr = []
      data.filter(item => item.entries_id === i)
        .forEach(j => {
          if (arr.includes(j.questions_id)) {
            return
          } else {
            arr.push(j.questions_id)
          }
        })
      questionsSets.push(arr)
    })
    let filteredData = []
    differentEntries.forEach((entry, i) => {
      let intermediate = []
      questionsSets[i].forEach(q => {
        intermediate.push(data.find(item => item.entries_id === entry && item.questions_id === q))
      })
      filteredData.push({ entry: entry, questions: intermediate, firstName: intermediate[0].first_name, lastName: intermediate[0].last_name })
    })
    setOutput(filteredData)
  }
  useEffect(() => {
    const token = localStorage.getItem('retroToken');
    if (!token) {
      navigate('/login')
      return;
    } else if (!user.user) {
      dispatch(fetchUser(token))
    }
    getEntries(token);
  }, [user]);

  useEffect(() => {
    if (output.length === 0 && entries.length !== 0) {
      allIndividualTeamEntries();
    }
  }, [entries, output]);

  useEffect(() => {
    allIndividualTeamEntries();
  }, [showTeam]);

  // const toggleYours = () => {
  //   setShowTeam(!showTeam);
  // }

  const options = {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  };

  const today = new Date();

  return (
    <div className="Reports__container">
      <Link 
        to="/" 
        className="Link--go-back">
          <BiArrowBack /> Back to profile
      </Link>
      <p className="Reports__header">Reports</p>
      {user.user
        && <h1 className="Reports__greeting">
            Hello, {user.user?.first_name}
          </h1>
      }
      {user.user?.team_name
        && <p className="Reports__team">
          Team {user.user.team_name}
        </p>
      }
      {user.user?.templates[0]
        && <p className="Reports__template">
          Template: {user.user.templates[0]}
        </p>
      }
      {/* <div className="Reports__toggle">
        <p className="Reports__toggle--text">
          {showTeam ? 'Team entries' : 'Your entries'} ({output?.length})
        </p>
        <button 
          onClick={toggleYours}
          className="Reports__toggle--btn btn--toggle">
            {showTeam ? 'See my entries' : 'See team entries'}
        </button>
      </div> */}
      <p className="Reports__toggle--text">
        {output?.length === 1 
          ? `${output?.length} entry` 
          : `${output?.length} entries`}
      </p>
      <SwitchToggle showTeam={showTeam} setShowTeam={setShowTeam}/>
      <div className="Reports-list">
        {output?.map(item => {
          const daysAgo = Math.floor((today - new Date(item.questions[0].date))/ (1000 * 3600 * 24))
          return (
          <div 
            key={item.entry} 
            className="Reports__card">
            <div className="Reports__card--header">
              <h2 className="Reports__card--name">
                {item.firstName} {item.lastName}
              </h2>
              <div className="Reports__card--dategroup">
                <p 
                  className="Reports__card--date">
                    {new Date(item.questions[0].date).toLocaleString('en-GB', options)}
                </p>
                <p 
                  className="Reports__card--daysago">
                    {daysAgo === 0 
                      ? 'today' 
                      : daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago` }
                </p>
              </div>
            </div>
            {
              item.questions?.map(q => (
                <div 
                  key={q.responseid} 
                  className="Reports__card--qa">
                  <p className="Reports__card--question">Q: {q.question}</p>
                  <p className="Reports__card--answer">A: {q.response}</p>
                </div>))
            }
          </div>
        )})
        }
      </div>
    </div>
  )
}
export default Reports