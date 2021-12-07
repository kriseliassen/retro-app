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
    const [output, setOutput] = useState([])
    const [filters, setFilters] = useState({team: true})

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
          setEntries(rawEntries.reports)
    }
    const allIndividualTeamEntries = () => {
        const data = [...entries]
        const differentEntries = []
        const questionsSets = []
        data.forEach(i=> {
            if (differentEntries.includes(i.entries_id)){
                return
            } else {
                differentEntries.push(i.entries_id)
            }
        })
        differentEntries.forEach(i => {
            let arr = []
            data.filter(item=>item.entries_id === i)
            .forEach(j=> {
                if (arr.includes(j.questions_id)){
                    return
                } else {
                    arr.push(j.questions_id)
                }
            })
            questionsSets.push(arr)
        })
        let filteredData = []
        differentEntries.forEach((entry, i)=>{
            let intermediate = []
            questionsSets[i].forEach(q=> {
                intermediate.push(data.find(item=> item.entries_id === entry && item.questions_id === q ))
            })
            filteredData.push({entry: entry, questions: intermediate, firstName: intermediate[0].first_name, lastName: intermediate[0].last_name})
        })
    return (filteredData)
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
        // setOutput(allIndividualTeamEntries())
    }, [user]);

    useEffect(() => {
        if(output.length === 0 && entries.length !== 0){
            setOutput(allIndividualTeamEntries())
        }
    },[entries]);

    const toggleYours = () => {
        if(filters.team === true){
            
        }
        console.log('toggle')
    }

    
    console.log('FUNCTION OUTPUT',allIndividualTeamEntries());
const options = {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
};
    return (
        <div>

            <p> REPORTS: Number of entries: {output?.length}</p>
            <button onClick={toggleYours}>Toggle Team/Yours</button>
            {output?.map(item=>(
                <div key={item.entry}>
                    <h2>User: {item.firstName} {item.lastName}</h2>
                    <p>{new Date(item.questions[0].date).toLocaleString('en-GB', options)}</p>
                {
                item.questions?.map(q=>(
                    <div key={q.responseid}>
                    <p>Question: {q.question}</p>
                    <p>Response: {q.response}</p>
                    </div>))
                }
                </div>    
                ))
            }
        </div>
    )
}
export default Reports