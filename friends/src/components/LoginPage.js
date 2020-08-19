import React, { useState, useContext } from 'react';
import axiosWithAuth from '../axios/axios';
import { FriendsContext } from './context';

export default function Login(props) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const { getFriends, setFriends } = useContext(FriendsContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then((res) => {
        window.localStorage.setItem('token', res.data.payload);
        setFriends([]);
        getFriends();
        props.history.push('/friends');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button onClick={login}>Log in</button>
      </form>
    </div>
  );
}