import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/post/' + post._id);

  return (
    <div className="postCard" onClick={handleClick}>
      <img src={post.imgUrl} alt="post" />
    </div>
  );
};

export default PostCard;
