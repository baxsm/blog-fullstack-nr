import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder="username" />
        <input required type="password" placeholder="password" />
        <button type='submit'>Submit</button>
        <p>This is an Error!</p>
        <span>Don't you have an account?<br></br>
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login