import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';


const Form = () => {
  const [questions, setQuestions] = useState([])
  const user = useSelector(state => state.user);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

const getQuestions = async () => {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const token = localStorage.getItem('retroToken');
    const resp = await fetch(`${SERVER_URL}/db/form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({template_name: user.user.templates[0]})
    })
    const questionsData = await resp.json()
    console.log(questionsData)
    setQuestions(questionsData)
  } catch(err) {
    console.log(err)
  }
}

useEffect(() => {
  if(user.user?.templates.length > 0 ){
    getQuestions()
  }

}, [])

  return (
    <div>
      <Link to="/">Go back to profile</Link>
      I am the form
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions?.map(item => (
          <div  key={item.id}>
            <label>{item.question}</label>
            <input type={item.type} {...register(`${item.id}`)} />
          </div>
        ))}
        <input type="submit" />
      </form>
    </div>
  )
}

export default Form
