import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

function Login() {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/")
    }
    catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" name='username' placeholder="username" onChange={handleChange} />
        <input required type="password" name='password' placeholder="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account?<br></br>
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login