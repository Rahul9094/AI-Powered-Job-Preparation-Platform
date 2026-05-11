import React from 'react'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    await handleRegister({email,username,password});
    navigate("/");
  }

  if (loading) {
    return (<main><h1>Loading..</h1></main>)
  }
  return (
  <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input onChange={(e)=>{setUsername(e.target.value)}}
            type="text" name='username' id='username' placeholder='Enter the username' />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}}
             type="email" name='email' id='email' placeholder='Enter the Email' />
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} 
            type="password" id='password' name='password' placeholder='Enter the password'/>
          </div>
          <button className='button primary-button'>Register</button>
          </form>
          <p>Already have an Account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
