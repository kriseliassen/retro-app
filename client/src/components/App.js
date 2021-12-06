import React, {useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import Profile from './Profile.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Form from './Form.js';
import About from './About.js';
import Report from './Report.js';
import CreateTemplate from './CreateTemplate.js';
import '../styles/App.css'
import '../styles/Menu.css'

const App = () => {
  const token = localStorage.getItem('retroToken');
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const logOut = () => {
    localStorage.removeItem('retroToken')
  }

  const handleStateChange = (state) =>{
    setMenuIsOpen(state.isOpen)
  }

  const closeMenu = () => {
    setMenuIsOpen(false)
  }

  return (
    <div className="App__container">
      <Menu 
        right
        width={ '50%' }
        isOpen={menuIsOpen}
        onStateChange={(state) => handleStateChange(state)}>
        <Link 
        onClick={closeMenu}
        id="about"
        className="menu-item"
        to="/about">
          About
        </Link>
        {token &&
          <>
          <Link
          onClick={closeMenu}
          id="home"
          className="menu-item"
          to="/">
            Profile
          </Link>
          <Link
          onClick={closeMenu}
            id="form"
            className="menu-item"
            to="/form">
            Form
          </Link>
          <Link
          onClick={() => {
            closeMenu()
          } }
          id="report"
          className="menu-item"
          to="/report">
            Report
          </Link>
          <Link
          onClick={() => {
            logOut()
            closeMenu()
          } }
          id="logout"
          className="menu-item"
          to="/login">
            Log out
          </Link>
          </>
        }
      </Menu>
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/form' element={<Form />} />
        <Route path='/about' element={<About />} />
        <Route path='/newtemplate' element={<CreateTemplate />} />
        <Route path='/report' element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
