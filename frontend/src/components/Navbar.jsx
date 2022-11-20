
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpRequest } from '../utils/http';

function NabBar () {
  const [me, setMe] = useState({})
  const navigate = useNavigate();
  const [token, setToken] = useState('')
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const getMe = async () => {
    const data = await httpRequest('/user/current', 'GET', {}, true);

    if (data.message) {
      alert(data.message);
    } else {
      setMe(data.user);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  // useEffect(() => {
  //   if (token !== null) {
  //     navigate('/login');
  //   } else {
  //     navigate('/home')
  //   }
  // }, [token]);

  const logout = async () => {
    await httpRequest('/logout', 'POST', {}, true);
    localStorage.clear()
    setToken(null);
    navigate('/login')
  }
  const login = () => {
    navigate('/login')
  }
  return (
    <div className="mb-3 d-flex justify-content-between">
      <div>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
        </ul>
      </div>
      <div>
        <b style={{ cursor: 'pointer', marginRight: 24/*  */ }} onClick={() => navigate('/me')}>{me && me.username}</b>
        {
          token ? <button id='logout' type="button" className="btn btn-danger" onClick={logout}>Logout</button> : null
        }
      </div>
      {
        !token || !(me && me.username) ? <button id='login' type="button" className="btn btn-danger" onClick={login}>Login</button> : null
      }

    </div>
  )
}

export default NabBar
