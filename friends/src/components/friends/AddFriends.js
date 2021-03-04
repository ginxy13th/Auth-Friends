import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FriendsContext } from '../context';

const initialFormValues = {
  name: '',
  age: '',
  email: '',
};

export default function AddFriend() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { postNewFriend } = useContext(FriendsContext);
  const history = useHistory();

  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newFriend = {
      name: formValues.name,
      age: formValues.age,
      email: formValues.email,
      id: Date.now(),
    };
    postNewFriend(newFriend);
    setFormValues(initialFormValues);
    history.push('/friends');
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Add a New Friend!</h2>
      <div>
        <input
          type="text"
          placeholder="..."
          name="name"
          value={formValues.name}
          onChange={onInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="..."
          value={formValues.age}
          onChange={onInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="..."
          value={formValues.email}
          onChange={onInputChange}
        />
        </div>
      <button>Submit</button>
    </form>
  );
}
