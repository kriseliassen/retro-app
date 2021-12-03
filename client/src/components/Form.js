import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {BiArrowBack} from 'react-icons/bi'
import '../styles/Form.css'


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
    <div className="Form__container">
      <Link to="/" className="Link--go-back">
        <BiArrowBack /> 
        Back to profile
      </Link>
      <h1 className="Form__header">
        <span className="Form__header--intro">Retro:</span>
        <br />
        {user.user?.templates[0]}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}className="Form__form">
        {questions?.map(item => (
          <div key={item.id}className="Form__form--question">
            <label className="Form__form--label">
              {item.question}
              {item.type==='number' ? ` Rate 1-5`
              : ''}
            </label>
            {item.type === 'text' ?
            <textarea
            {...register(`${item.id}`)} 
            className="Form__form--input Form__form--textarea"/>
            : <input 
            type={item.type} 
            {...register(`${item.id}`)} 
            className="Form__form--input"/>}
          </div>
        ))}
        <input type="submit" className="btn--form Form__btn--form"/>
      </form>
    </div>
  )
}

export default Form
