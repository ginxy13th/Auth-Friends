import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/friends/friendlist';
import Login from './components/LoginPage';
import AddFriend from './components/friends/AddFriends';
import axiosWithAuth from './axios/axios';
import { FriendsContext } from './components/context';

function App() {
  const [friends, setFriends] = useState([]);

  const getFriends = () => {
    axiosWithAuth()
      .get('/api/friends')
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getFriends();
  }, []);

  const postNewFriend = (friend) => {
    axiosWithAuth()
      .post('/api/friends', friend)
      .then((res) => {
        setFriends([]);
        getFriends();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFriend = (id) => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then((res) => {
        setFriends([]);
        getFriends();
      });
  };

  return (
    <BrowserRouter>
      <FriendsContext.Provider
        value={{
          setFriends,
          getFriends,
          friends,
          postNewFriend,
          deleteFriend,
        }}
      >
        <div>
          <header>
            <h3>FriendsList</h3>
            <Link to="/">
              Home
            </Link>
            <Link to="/Login">
              Login
            </Link>
            <Link to="/Friends">
              Friends
            </Link>
          </header>
        </div>
        <div>
          <Switch>
            <PrivateRoute path="/friends" component={FriendsList} />
            <PrivateRoute path="/add-friend" component={AddFriend} />
            <Route path="/login" component={Login} />
            <Route exact path="/">
              <h1>Welcome to FriendsList</h1>
            </Route>
          </Switch>
        </div>
      </FriendsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
