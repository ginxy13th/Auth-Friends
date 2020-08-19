import React from 'react';

export default function Friend(props) {
  return (
    <div className="card">
      <h2>{props.friend.name}</h2>
      <h3>Age: {props.friend.age}</h3>
      <h3>{props.friend.email}</h3>
      <button onClick={() => props.deleteFriend(props.friend.id)}>
        Delete
      </button>
    </div>
  );
}