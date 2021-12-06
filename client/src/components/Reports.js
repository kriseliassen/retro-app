import React , { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../state/actionCreators';


const Reports = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [entries, setEntries] = useState([])
    const getEntries = async (token) =>{
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
          console.log(rawEntries)
          setEntries(rawEntries.reports)
    }
    useEffect(() => {
        const token = localStorage.getItem('retroToken');
        if(!token) {
          navigate('/login')
          return;
        } else if (!user.user) {
          dispatch(fetchUser(token))
        } 
        getEntries(token);
      }, [user]);

    return (
        <div>

            <p> REPORTS: Number of entries: {entries?.length}</p>
            {entries.map(item=>(
                <div>
                    <p>Entry Id: {item.entries_id}</p>
                    <p>Question: {item.question}</p>
                    <p>Response: {item.response}</p>
                </div>    
                ))
            }
        </div>
    )
}
export default Reports