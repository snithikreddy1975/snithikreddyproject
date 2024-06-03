import React, { useState} from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import './App'

const UserForm = ({ user, onSave }) => {
    const navigate=useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/users', { name, email })
        navigate("/users")  
        };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <h2>Add User</h2>
            <p>Name:  </p>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <p>Email:  </p>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br/>
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;