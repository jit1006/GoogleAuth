import { useState } from 'react'
import reactLogo from './assets/react.svg'
import firebaseLogo from './assets/firebase-logo.png'

import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://firebase.google.com/" target="_blank">
          <img src={firebaseLogo} className="logo" alt="Firebase logo" />
        </a>
      </div>
      <h1>Vite + React + Firebase</h1>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />

          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
