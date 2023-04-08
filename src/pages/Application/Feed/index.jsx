import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import Wrapper from '../../../components/Wrapper';
import './style.css';
const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const DEFAULT_AVATAR =
    'https://img.freepik.com/free-icon/user_318-159711.jpg';

  useEffect(() => {
    api
      .getFeed()
      .then((feeds) => setFeeds(feeds))
      .finally(() => setIsLoading(false));
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.getUsers().then((users) => setUsers(users));
  }, []);

  const getAuthorLogin = (ownerId) => {
    const user = users.find((user) => user._id === ownerId);
    return user ? user.login : '';
  };

  const getAuthorAvatar = (ownerId) => {
    const user = users.find((user) => user._id === ownerId);
    return user ? user.avatar : '';
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper>
      <div className="feed-container">
        {feeds.map((feed) => (
          <Link to={`/users/${feed.ownerId}`}>
            <div key={feed._id} className="feed-item">
              <div className="owner-avatar">
                <img
                  src={getAuthorAvatar(feed.ownerId) || DEFAULT_AVATAR}
                  alt="avatar"
                />
              </div>
              <h3>{getAuthorLogin(feed.ownerId)}</h3>
              <img src={feed.imgUrl} alt="feed-img" />
              <h2>{feed.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default Feed;
