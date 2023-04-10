import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { NavLink } from 'react-router-dom';
import Wrapper from '../../../components/Wrapper';
import Button from '../../../components/Button';
import { useDebounce } from '../../../hooks/useDebounce';
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

  const handleChangeSearch = useDebounce((event) => {
    const { value } = event.target;
    api
      .getUsers(value)
      .then((users) => setUsers(users))
      .finally(() => setIsLoading(false));
  }, 1000);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper>
      <div className="users-list">
        <div className="users-searh">
          <input
            placeholder="Enter user login..."
            onChange={handleChangeSearch}
          />
        </div>
        {!users.length ? (
          <div>
            <img src="/assets/svg/not-found.svg" alt='not-found'/>
            <h2>User not found</h2>
          </div>
        ) : (
          users.map((user) => <User key={'user_' + user._id} user={user} />)
        )}
      </div>
    </Wrapper>
  );
};

export default Users;
