/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import { httpRequest } from '../utils/http'
import NabBar from '../components/Navbar'

function Home () {
  const [users, setUsers] = useState([])
  // const navigate = useNavigate();

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const data = await httpRequest('/users', 'GET', {}, false);

    if (data.message) {
      alert(data.message);
    } else {
      setUsers(data.data);
    }
  }

  return (
    <div className="container pt-3">
      <NabBar />
      <div className="d-flex row">
        {
          users.length > 0 ? users.map(item => (
            <div key={item.id} className="col-xs-6 col-sm-4 col-lg-3 card mb-3 w-20 me-2">
              {item.picture && <img src={item.picture} className="card-img-top" alt="..." />}
              <div className="card-body">
                <h5 className="card-title">UserName: {item.username}</h5>
                <p>Biography: {item.biography || '-'}</p>
              </div>
            </div>
          )) : (<span>No Data Here,Please Login!</span>)
        }

      </div>
    </div>
  )
}

export default Home
