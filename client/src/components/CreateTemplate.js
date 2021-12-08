import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../state/actionCreators';
import { addUser } from '../state/actionCreators';
import '../styles/CreateTemplate.css'

const CreateTemplate = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [template, setTemplate] = useState({ templateName: '', questions: [] });
  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm();
  const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm();

  const onSubmitTemplateName = (data, e) => {
    const updatedTemplate = { ...template }
    updatedTemplate.templateName = data.templateName
    updatedTemplate.templateDescription = data.templateDescription
    updatedTemplate.teamId = user.user?.team_id;
    updatedTemplate.teamName = user.user?.team_name;
    setTemplate(updatedTemplate)
    e.target.reset();
  }

  const onSubmitQuestion = async (data, e) => {
    const updatedTemplate = { ...template }
    updatedTemplate.questions.push(data)
    setTemplate(updatedTemplate);
    e.target.reset();
  }

  const deleteQuestion = async (e, item) => {
    e.preventDefault()
    const questions = template.questions.filter(i => i.question !== item.question)
    const newTemplate = { ...template }
    newTemplate.questions = questions
    setTemplate(newTemplate)
  }

  const onSubmitTemplate = async data => {
    try {
      const token = localStorage.getItem('retroToken');
      await fetch(`${SERVER_URL}/db/templates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(template)
      })
      const updatedUser = { ...user };
      updatedUser.user.templates = [template.name];
      dispatch(addUser(updatedUser));
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('retroToken');
    if (!token) {
      navigate('/login')
      return;
    } else if (user.user?.templates.length > 0) {
      navigate('/')
      return;
    } else if (!user.user) {
      dispatch(fetchUser(token))
    }
  }, [user]);

  return (
    <div className="CreateTemplate__container">
      <Link to="/" className="Link--go-back">
        <BiArrowBack />
        Back to profile
      </Link>
      <h1 className="CreateTemplate__header">
        Create a new template
      </h1>
      <h3 className="CreateTemplate__questions--header">
        Add title and description
      </h3>
      <form onSubmit={handleSubmit1(onSubmitTemplateName)} className="CreateTemplate__form">
        <input
          type="text"
          placeholder="Template name"
          {...register1("templateName", { required: true })}
          className="CreateTemplate__form--input" 
          id="template-name"
          autoComplete="off"/>
        <input
          type="text"
          placeholder="Template description"
          {...register1("templateDescription", { required: false })}
          className="CreateTemplate__form--input" 
          id="template-description"
          autoComplete="off"/>
        <input
          type="submit"
          value="Confirm"
          className="btn--form CreateTemplate__btn--form" />
      </form>
      {template.templateName &&
        <>
          <h3 className="CreateTemplate__questions--header">
            Add questions
          </h3>
          <form
            onSubmit={handleSubmit2(onSubmitQuestion)}
            className="CreateTemplate__form">
            <input
              type="text"
              placeholder="Question text"
              {...register2("question", { required: true })}
              className="CreateTemplate__form--input" 
              autoComplete="off"/>
            <div className="CreateTemplate__form--type">
              <p className="CreateTemplate__form--title">
                Type of response
              </p>
              <div className="CreateTemplate__form--input-group">
                <input
                  {...register2("type", { required: true })}
                  type="radio"
                  value="text"
                  id="type--text"
                  className="CreateTemplate__form--radio" />
                <label className="CreateTemplate__form--label"
                  htmlFor="type--text">
                  Text
                </label>
              </div>
              <div className="CreateTemplate__form--input-group">
                <input
                  {...register2("type", { required: true })} type="radio"
                  value="number"
                  className="CreateTemplate__form--radio" />
                <label className="CreateTemplate__form--label">
                  Number
                </label>
              </div>
            </div>

            <input
              type="submit"
              value="Add question"
              className="btn--form CreateTemplate__btn--form" />
          </form>
        </>}
      {template.templateName 
      && <>
          <h2 className="CreateTemplate__header">
            Preview template:
          </h2>
          <p className="CreateTemplate__subheader">
            {template.templateName}
          </p>
        </>}
      {(template.templateName 
        && template.questions.length === 0) 
        && <p className="CreateTemplate__description">
            This template has no questions yet. Add some questions to see the form here.
          </p>}
      <form className="CreateTemplate__form" 
      onSubmit={handleSubmit3(onSubmitTemplate)}>
        {template.questions?.map(item => (
          <div 
            key={item.id} className="CreateTemplate__form--input-list">
            <label className="CreateTemplate__form--label">
              {item.question}
              {item.type === 'number' ? ` - Rate 1-5`
                : ''}
            </label>
            {item.type === 'text' ?
              <textarea
                {...register3(`${item.id}`)}
                className="CreateTemplate__form--input CreateTemplate__form--textarea" 
                disabled/>
              : <input
                type={item.type}
                {...register3(`${item.id}`)}
                className="CreateTemplate__form--input" 
                disabled/>}
            <button 
            onClick={e => deleteQuestion(e, item)}
            className="btn--delete">
              Delete question
            </button>
          </div>
        ))}
        {(template.questions.length > 0 && template.templateName) && <input type="submit" className="btn--form Form__btn--form" value="Submit new template" />}
      </form>
    </div>
  )
}
export default CreateTemplate
