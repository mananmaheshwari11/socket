import React from 'react'
import axios from 'axios'

const handleSubmit = () =>{
    axios.post("")
}

function Login() {
  return (
    <div className='bg-slate-200 text-black'>
        <h1>Meet Project</h1>
        <h2>Welcome back</h2>
        <p>Welcome back! Please enter your details.</p>
        <form>
        <label htmlFor='email' className='block'>Email</label>
        <input type="email" className='block' name="email" id="email"></input>
        <label htmlFor='password' className='block'>Password</label>
        <input type="password" className='block' name="password" id="email"></input>
        <button className='rounded border-2 border-black my-3' onClick={handleSubmit}>Login</button>
        </form>
    </div>
  )
}

export default Login