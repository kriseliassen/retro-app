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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
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
