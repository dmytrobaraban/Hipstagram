import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/post/' + post._id);

  return (
    <div className="postCard" onClick={handleClick}>
      <img src={post.imgUrl} alt="post" />
      <p>{post.title}</p>
      <p>Likes: {post.likes.length}</p>
    </div>
  );
};

export default PostCard;
