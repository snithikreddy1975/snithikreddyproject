import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function UpdateForm() {
  const navigate=useNavigate()
  const {id}=useParams()
  const location=useLocation()
  const [name,setName]=useState(location.state.name)
  const [email,setEmail]=useState(location.state.email)
  const editdone=async ()=>{
    await axios.put(`http://localhost:5000/users/${id}`,{name,email})
    navigate("/users")
  }
  return (
    <div>
        <h2>Update User</h2>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button onClick={editdone}>Done</button>
    </div>
  )
}

export default UpdateForm