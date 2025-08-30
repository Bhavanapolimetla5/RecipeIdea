import React from 'react'
import UserInput from './UserInput'
import Footer from './Footer'
import './App.css'
const App = () => {
  return (
    <div className='app'>
      <h1>Recipe Idea</h1>
      <div className='header'>
      <p>Welcome to the Recipe Idea! Here you can find delicious recipes.</p>
      </div>
      <UserInput/>
      <Footer/>
      </div>
  )
}

export default App

