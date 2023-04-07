import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { NavLink } from 'react-router-dom';
import Wrapper from '../../../components/Wrapper';
import Button from '../../../components/Button';
import './style.css';

const DEFAULT_AVATAR = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

const User = ({ user }) => {
  const [isFollowed, setIsFollowed] = useState(user.isFollow);
  const [avatar] = useState(user.avatar);

  const handleToggleFollow = async () => {
    if (isFollowed) {
      await api.followUser(user._id);
      setIsFollowed(false);
    } else {
      await api.followUser(user._id);
      setIsFollowed(true);
    }
  };

  const styleFollow = {
    follow: {
      backgroundColor: '#4D88ED',
    },
    unfollow: {
      backgroundColor: '#FE7171',
    },
  };

  return (  
    <div className="user-item">
      <>
        <img src={avatar || DEFAULT_AVATAR} alt="avatar" />
        <NavLink to={`/users/${user._id}`}>{user.login}</NavLink>
      </>
      {isFollowed ? (
        <Button style={styleFollow.unfollow} onClick={handleToggleFollow}>
          Unfollow
        </Button>
      ) : (
        <Button style={styleFollow.follow} onClick={handleToggleFollow}>
          Follow
        </Button>
      )}
      
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
    <Wrapper>
      <div className="users-list">
        {!users.length ? (
          <h1>Users not found</h1>
        ) : (
          users.map((user) => <User key={'user_' + user._id} user={user} />)
        )}
      </div>
    </Wrapper>
  );
};

export default Users;
