import React,{useState} from 'react'
import CallingApi from './CallingApi';
import './App.css'
const UserInput = () => {
const [input, setInput] = useState('');//input state to store user input
const [query, setQuery] = useState('');//query state to store submitted input
//function to handle form submission
const handleSubmit = (e)=>{
    e.preventDefault();
    setQuery(input);
}
  return (
    //form to take user input
    <div className='ComInput'>
    <h2>Search Your Recipe</h2>
    <p>Enter the ingredint you have</p>
    <form onSubmit={handleSubmit}>
     <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder='eg:Eggs/chicken' /> 
     <button type="submit">Submit</button>
     </form>
     
       {query && <CallingApi value={query} />}
    </div>
  )
}

export default UserInput
