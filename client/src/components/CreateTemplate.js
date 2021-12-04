import React , { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'

import { useForm } from 'react-hook-form';


const CreateTemplate = () => {
    const [questions, setQuestions] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();


    const addQuestion = () =>{

    }

    const onSubmit = async data => {
    }

    return (
        <div className="Form__container">
      <Link to="/" className="Link--go-back">
        <BiArrowBack /> 
        Back to profile
      </Link>
      <h1 className="Form__header">
        <span className="Form__header--intro">New Entry:</span>
        <br />
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}className="Form__form">
        {/* {questions?.map(item => ( */}
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
        {/* ))} */}
        <input type="submit" className="btn--form Form__btn--form"/>
      </form>
    </div>
    )
}
export default CreateTemplate
