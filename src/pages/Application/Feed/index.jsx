import React from 'react';
import api from '../../../services/api';
import { useEffect, useState } from 'react';
import './style.css';
import Wrapper from '../../../components/Wrapper';
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
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Feed;
