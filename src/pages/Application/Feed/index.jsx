import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import Wrapper from '../../../components/Wrapper';
import './style.css';
const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getFeed()
      .then((feeds) => setFeeds(feeds))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper>
      <div className="feed-container">
        {feeds.map((feed) => (
          <div key={feed._id} className="feed-item">
            <img src={feed.imgUrl} alt="feed-img" />
            <h2>{feed.title}</h2>
            <Link to={`/users/${feed.ownerId}`}>
              <p>{feed.ownerId}</p>
            </Link>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Feed;
