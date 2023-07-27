/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import api from '../../../services/api';
import Wrapper from '../../../components/Wrapper';
import Input from '../../../components/Input';
import './style.css';

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isShowLikes, setIsShowLikes] = useState(false);
  const [addedComment, setAddedComment] = useState();
 
  useEffect(() => {
    api.getPostById(postId).then((data) => {
      setPost(data);
    });
  }, []);

  useEffect(() => {
    api.getComments(postId).then((data) => {
      setComments(data);
    });
  }, []);

  const handleClickBack = () => navigate(-1);

  const handleChangeInput = (e) => {
    setAddedComment(e.target.value);
  };

  const handleAddComment = () => {
    api.addComment(postId, addedComment).then(() => {
      api.getComments(postId).then((data) => {
        setComments(data);
      });
    });
  };

  const DEFAULT_AVATAR =
    'https://img.freepik.com/free-icon/user_318-159711.jpg';

  if (!post) {
    return <h1>Post not found</h1>;
  }

  const [firstLikedUser = null, ...likes] = post.likes;

  return (
    <Wrapper>
      <h2 className="post-title">{post.title}</h2>
      <img
        className="arrow-back"
        src="/assets/svg/arrow-left.svg"
        alt="back to post"
        onClick={handleClickBack}
      />
      <div className="post-container">
        <div className="content-post">
          <img src={post.imgUrl} alt="post" />
        </div>
        <div className="post-comment">
          <div className="comment-field">
            {comments.map((comment) => (
              <div className="content-comment">
                <img
                  src={comment.owner.avatar || DEFAULT_AVATAR}
                  alt="comment-owner"
                />
                <div>
                  <span className="owner-span">{comment.owner.login}</span>
                  <span> {comment.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="post-likes">
            {!isShowLikes ? (
              <>
                <div className="like-container">
                  <button
                    className="like-post unliked"></button>
                  {post.likes.length ? (
                    <span
                      className="show-likers"
                      onClick={() => setIsShowLikes(true)}
                    >
                      Likes :
                      {firstLikedUser && (
                        <NavLink to={`/users/${firstLikedUser._id}`}>
                          {firstLikedUser.login}
                        </NavLink>
                      )}{' '}
                      and {likes.length ? likes.length : 0} other...
                    </span>
                  ) : (
                    <p style={{ marginLeft: '20px' }}>No likes</p>
                  )}
                </div>
              </>
            ) : (
              <div className="users-likes">
                <button onClick={() => setIsShowLikes(false)}>Hide</button>
                {post.likes.map((like) => (
                  <div>
                    <NavLink to={`/users/${like._id}`}>{like.login}</NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="input-field">
            <Input
              onChange={handleChangeInput}
              type="text"
              placeholder="Add comment..."
              className="add-comment-input"
            />
            <button onClick={handleAddComment} type="button">
              Send
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Post;
