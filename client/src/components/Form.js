import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';


const Form = () => {
  const [questions, setQuestions] = useState([])
  const user = useSelector(state => state.user);

  // const formData = [
  //   {id: 1, question: 'Engine: What has been pushing us forward or making us move faster?', type: 'text'},
  //   {id: 2, question: 'How fun was today?', type: 'number'}
  // ];
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

const getQuestions = async () => {
  const token = localStorage.getItem('retroToken');
  const resp = await fetch('/db/form', {
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
          <div>
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
