import React from 'react';
import { httpRequest } from '../utils/http';
import { useNavigate } from 'react-router-dom';

function Login () {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const onLogin = async () => {
    const res = httpRequest('/login', 'POST', { username, password }, false);
    const data = await res;
    if (data.message) {
      alert(data.message);
    } else {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username)
      console.log(localStorage);
      navigate('/home');
    }
  }

  // console.log(localStorage, 'local storage on login')
  return (
    <div className="container pt-3">
      <h2>Login</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">UserName</label>
        <input type="text" className="form-control" id="username" onChange={(event) => setUsername(event.target.value)} value={username}/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label" >Password</label>
        <input type="password" className="form-control" id="password" onChange={(event) => setPassword(event.target.value)} value={password}/>
      </div>
      <div>
        <button type="button" className="btn btn-primary" onClick={onLogin}>Login</button>
        <a href="/register" type="button" className="btn btn-link">Register</a>
      </div>
    </div>
  )
}

export default Login
