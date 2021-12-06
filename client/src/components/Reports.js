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
          console.log('ORIGINAL DATA ', rawEntries.reports)
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
            console.log('intermediate', i, intermediate )
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
        if(output.length === 0){
            setOutput(allIndividualTeamEntries())
        }
    },[output]);

    
    
    console.log('FUNCTION OUTPUT',allIndividualTeamEntries());

    return (
        <div>

            <p> REPORTS: Number of entries: {output?.length}</p>
            {output?.map(item=>(
                <div key={item.entry}>
                    <h2>User: {item.firstName} {item.lastName}</h2>
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