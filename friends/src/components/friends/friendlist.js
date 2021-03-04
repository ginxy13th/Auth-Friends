import React, { useContext } from 'react';
import Friend from './friend';
import { useHistory } from 'react-router-dom';
import { FriendsContext } from '../context';

export default function FriendsList() {
  const history = useHistory();
  const { friends, deleteFriend} = useContext(FriendsContext);

  const handleClick = () => {
    history.push('/add-friend');
  };
  return (
    <div className="friends-list">
      <h2>Your Friends</h2>
      <button onClick={handleClick}>Add a New Friend</button>
      <div className="friend-cards">
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} deleteFriend={deleteFriend} />
        ))}
      </div>
    </div>
  );
}