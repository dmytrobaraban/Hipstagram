import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import api from '../../services/api';

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isShowLikes, setIsShowLikes] = useState(false);

  useEffect(() => {
    api.getPostById(postId).then((data) => {
      setPost(data);
    });
  }, []);

  const handleClickBack = () => navigate(-1);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  const [firstLikedUser = null, ...likes] = post.likes;

  return (
    <div>
      <button onClick={handleClickBack}>Back</button>
      <h1>POST: {post.title}</h1>
      <img style={{ maxWidth: 300 }} src={post.imgUrl} alt="post" />
      {!isShowLikes ? (
        <p onClick={() => setIsShowLikes(true)}>
          {post.likes.length ? (
            <span>
              Likes:{' '}
              {firstLikedUser && (
                <NavLink to={`/users/${firstLikedUser._id}`}>
                  {firstLikedUser.login}
                </NavLink>
              )}{' '}
              and {likes.length ? likes.length : 0}
            </span>
          ) : (
            <p>No Likes</p>
          )}
        </p>
      ) : (
        <ul>
          <button onClick={() => setIsShowLikes(false)}>Hide</button>
          {post.likes.map((like) => (
            <li>
              <NavLink to={`/users/${like._id}`}>{like.login}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Post;
