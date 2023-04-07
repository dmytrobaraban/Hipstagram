import React from 'react';
import api from '../../services/api';
import { useEffect, useState } from 'react';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    api.getFeed().then((feeds) => setFeeds(feeds));
  }, []);

  return (
    <div className="feed-container">
      {feeds.map((feed) => (
        <div key={feed._id}>
          <h2>{feed.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Feed;
