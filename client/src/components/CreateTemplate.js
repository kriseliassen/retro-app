import React , { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'

import { useForm } from 'react-hook-form';


const CreateTemplate = () => {
    const [template, setTemplate] = useState({templateName:'', questions: []});
    const { register: register1, handleSubmit: handleSubmit1, formState: { errors:errors1 } } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors:errors2 } } = useForm();
  const { register: register3, handleSubmit: handleSubmit3, formState: { errors:errors3 } } = useForm();

    const onSubmitTemplateName = (data) => {
        console.log('SET TEMPLATE')
        console.log(data)
        const updatedTemplate = {...template}
        updatedTemplate.templateName = data.templateName
        setTemplate(updatedTemplate)
        console.log(template)
    }

    const onSubmitQuestion = async data => {
        console.log('QUESTION', data)
        const updatedTemplate = {...template}
        updatedTemplate.questions.push(data)
        console.log(updatedTemplate)
        setTemplate(updatedTemplate)
        console.log(template)
    }
    const deleteQuestion = async (e,item) => {
      e.preventDefault()
      const questions = template.questions.filter(i=>i.question !== item.question)
      const newTemplate = {...template}
      newTemplate.questions= questions
      setTemplate(newTemplate)
    }
    const onSubmitTemplate = async data => {
        
        console.log('Template: ', template)
    }

    useEffect(()=>{},[template])

    return (
        <div className="Form__container">
      <Link to="/" className="Link--go-back">
        <BiArrowBack /> 
        Back to profile
      </Link>
      <h1 className="Form__header">
         <span className="Form__header--intro">Create a new template</span>
      </h1>
        <form onSubmit={handleSubmit1(onSubmitTemplateName)}>
            <input type="text" placeholder="Template name" {...register1("templateName", {required: true})} />
            <input type="submit" />
        </form>
        <br />
        { template.templateName && 
        <div>
        <h3>Add a new question</h3>
        <form onSubmit={handleSubmit2(onSubmitQuestion)}>
            <input type="text" placeholder="Question Text" {...register2("question", {required: true})} />
            <p>Type</p>
            <span>Text</span>
            <input {...register2("type", { required: true })} type="radio" value="text" />
            <span>Number</span>
            <input {...register2("type", { required: true })} type="radio" value="number" />

            <input type="submit" />
        </form> 
        </div>}
        <h1 className="Form__header">
        {template.templateName && <span className="Form__header--intro">{`Template draft: ${template.templateName}`}</span>}
      </h1>
        {(template.templateName && template.questions.length === 0) && <span className="">This template has no questions yet.</span>}
      <form className="Form__form" onSubmit={handleSubmit3(onSubmitTemplate)}>
        {template.questions?.map(item => (
          <div key={item.id}className="Form__form--question">
            <label className="Form__form--label">
              {item.question}
              {item.type==='number' ? ` Rate 1-5`
              : ''}
            </label>
            {item.type === 'text' ?
            <textarea
            {...register3(`${item.id}`)} 
            className="Form__form--input Form__form--textarea"/>
            : <input 
            type={item.type} 
            {...register3(`${item.id}`)} 
            className="Form__form--input"/>}
            <button onClick={e=>deleteQuestion(e,item)}>Delete question</button>
          </div>
         ))}
        {(template.questions.length > 0 && template.templateName) && <input type="submit" className="btn--form Form__btn--form" value="Submit new template"/>}
      </form>
    </div>
    )
}
export default CreateTemplate