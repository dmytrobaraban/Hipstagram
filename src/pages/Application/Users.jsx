import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { NavLink } from 'react-router-dom';

const User = ({ user }) => {

    return (
    <div>
      <NavLink to={`/users/${user._id}`}>Login: {user.login}</NavLink>
      Email: {user.email}
      {user.isFollow ? <button>Unfollow</button> : <button>Follow</button>}
    </div>
    );
    
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getUsers()
      .then((users) => setUsers(users))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {!users.length ? (
        <h1>Users not found</h1>
      ) : (
        users.map((user) => <User key={'user_' + user._id} user={user} />)
      )}
    </div>
  );
};

export default Users;
