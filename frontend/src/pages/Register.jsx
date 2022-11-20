import React, { useState } from 'react';
import { httpRequest } from '../utils/http'
import { useNavigate } from 'react-router-dom';
import { uploadFile } from 'react-s3';
import { config } from '../utils/s3'

function Register () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [biography, setBiography] = useState('');
  const [picture, setPicture] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const navigate = useNavigate();

  const onRegister = async () => {
    if (password !== confirmPassword) {
      alert('Two password must ba same!');
      return
    }

    const res = await httpRequest('/register', 'POST', { picture, biography, password, username }, false)
    if (res.error) {
      alert(res.error);
    } else {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', username)
      navigate('/home');
    }
  }

  const handleChangePicture = e => {
    if (!e.target.files[0]) {
      return
    }
    uploadFile(e.target.files[0], config).then(data => {
      setPicture(data.location)
    }).catch(err => console.error(err))
  }

  return (
    <div className="container pt-3">
      <h2>Register</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label" >UserName</label>
        <input type="text" className="form-control" id="username" onChange={(event) => setUsername(event.target.value)} value={username} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" onChange={(event) => setPassword(event.target.value)} value={password} />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="confirmPassword" onChange={(event) => setconfirmPassword(event.target.value)} value={confirmPassword} />
      </div>
      <div className="mb-3">
        <label htmlFor="biography" className="form-label">Biography</label>
        <input type="biography" className="form-control" id="biography" onChange={(event) => setBiography(event.target.value)} value={biography} />
      </div>
      <div className="mb-3">
        <label htmlFor="picture" className="form-label" >Picture</label>
        <input type="file" className="form-control" id="picture" onChange={(event) => handleChangePicture(event)} />
      </div>
      <div>
        <button type="button" className="btn btn-primary" onClick={onRegister}>Register</button>
        <a href="/login" type="button" className="btn btn-link" >Login</a>
      </div>
    </div>
  )
}

export default Register
