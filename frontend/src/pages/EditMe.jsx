import React, { useState, useEffect } from 'react';
import { httpRequest } from '../utils/http'
import NabBar from '../components/Navbar'
import { uploadFile } from 'react-s3';
import { config } from '../utils/s3'
// import { fileToDataUrl } from '../utils/common'

function EditMe () {
  const [form, setForm] = useState({
    username: '',
    biography: '',
    picture: '',
  })

  useEffect(async () => {
    const data = await httpRequest('/user/current', 'GET', {}, true);
    setForm({
      ...data.user,
    })
  }, [])

  const handleFormChange = (key, value) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  const handleChangePicture = e => {
    if (!e.target.files[0]) {
      return
    }
    uploadFile(e.target.files[0], config).then(data => {
      handleFormChange('picture', data.location)
    }).catch(err => console.error(err))
  }

  const update = () => {
    httpRequest('/user', 'PUT', form, true).then(res => {
      if (res.message) {
        alert(res.message);
      } else {
        alert('Update success!');
      }
    })
  }

  const { username, biography, picture } = form;
  return (
    <div className="container pt-3">
      <NabBar />
      <div>
        <h2>Update Me</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label" >UserName</label>
          <input type="text" className="form-control" id="username" onChange={(event) => handleFormChange('username', event.target.value)} value={username} />
        </div>
        <div className="mb-3">
          <label htmlFor="biography" className="form-label">Biography</label>
          <input type="biography" className="form-control" id="biography" onChange={(event) => handleFormChange('biography', event.target.value)} value={biography} />
        </div>
        <div className="mb-3">
        <label htmlFor="picture" className="form-label" >Picture</label>
          <div className="me-3" style={{ position: 'relative' }}>
            <input type="file" style={{ position: 'absolute', width: 140, height: 65, cursor: 'pointer', opacity: !picture ? 1 : 0 }} onChange={(event) => handleChangePicture(event)} />
            <label className="py-2 px-3 rounded" >
              <img style={{ width: 100 }} src={picture} alt="" />
            </label>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={update}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default EditMe
