import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App'

const UserList = () => {
    const navigate=useNavigate()
    const [users, setUsers] = useState([]);
    const userdetails=async()=>{
        const response=await axios.get('http://localhost:5000/users')
        setUsers(response.data)
    }

    useEffect(() =>{
        userdetails()
    },[]);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5000/users/${id}`)
        setUsers(users.filter(user => user.id !== id));
    };
    const adduser=()=>{
        navigate("/")
    }

    const onEdit=(id,name,email)=>{
        navigate(`/users/${id}`,{state:{name:name,email:email}})
    }

    return (
        <div>
            <button onClick={adduser}>Add+</button>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                        <button onClick={() => onEdit(user.id,user.name,user.email)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;