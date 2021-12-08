import React from 'react'
import '../styles/About.css'
import {BiArrowBack} from 'react-icons/bi'
import {BsGithub} from 'react-icons/bs'
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="About__container">
      <Link to="/" className="Link--go-back"><BiArrowBack /> Back</Link>
      <h1 className="About__header">
        About Retro
      </h1>
      <p className="About__text">
      An app that helps teams log their retrospectives and track their progress. 
      <br/>
      <br/>
      Users can create or join teams, use predefined retrospectives models or create their own, and track their team evolution.

      </p>
      <ul className="About__list">
        <p className="About__created-by">Created by
        </p>
        <li className="About__list-item">
          <a href="https://github.com/tarcea">
          Gheorghe Tarcea
          </a>
        </li>
        <li className="About__list-item">
          <a href="https://github.com/jordiaixela">
            Jordi Aixela
          </a>
        </li>
        <li className="About__list-item">
          <a href="https://github.com/kriseliassen">
            Kristin Eliassen
          </a>
        </li>
      </ul>
      <a href="https://github.com/Fjordie/retro-app" className="About__gh-link">
        <BsGithub />
      </a>
    </div>
  )
}

export default About
