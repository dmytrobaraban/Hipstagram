import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import api from '../../../services/api';
import PostCard from '../../../components/PostCard';
import { useIndificate } from '../../../hooks';
import Input from '../../../components/Input';
import Wrapper from '../../../components/Wrapper';
import store from '../../../store';
import './style.css';

const UploadPost = ({ handleAddPost }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpenForm = () => {
    setIsOpenForm(true);
  };

  const handleCloseForm = () => setIsOpenForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, image } = e.target.elements;
    const body = {
      title: title.value,
      image: image.files[0],
    };

    api
      .createPost(body)
      .then((data) => {
        handleAddPost(data);
        handleCloseForm();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (!isOpenForm) {
    return (
      <button onClick={handleOpenForm} className={'add-post'}>
        Add post
      </button>
    );
  }

  return (
    <div className={`${isOpenForm ? 'modal' : ''}`}>
      <form className="create-post" onSubmit={handleSubmit}>
        <Input name="title" label="Title" type="text" placeholder="Title..." />
        <Input name="image" label="Photo" type="file" placeholder="Photo..." />
        <button type="submit">Create post</button>
        <button onClick={handleCloseForm} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
};

const User = () => {
  const params = useParams();
  const isPersonalPage = useIndificate(params.userId);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setfollowers] = useState();
  const [isLoadingFollowers, setIsLoadingFollowers] = useState(true);
  const [isFollow, setIsfollow] = useState(false);

  const handleAddPost = (post) => {
    const newUser = {
      ...user,
      posts: [...user.posts, post],
    };

    setUser(newUser);
  };

    const handleToggleFollow = async () => {
      if (isFollow) {
        await api.followUser(user.id);
        setIsfollow(false);
      } else {
        await api.followUser(user.id);
        setIsfollow(true);
      }
    };

  useEffect(() => {
    api
      .getFollowersAndFollowings(params.userId)
      .then((users) => setfollowers(users))
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingFollowers(false));
  }, []);

  useEffect(() => {
    api
      .getUserById(params.userId)
      .then((user) => setUser(user))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoadingFollowers) {
        const myId = store.getState().user.user.id;
        const follower = followers.followers;
        for (const followed of follower) {
          followed.id === myId ? setIsfollow(true) : setIsfollow(false);
        }
    }
  }, [isLoadingFollowers, followers]);

  if (isLoading) return <h1>Loading...</h1>;

  const DEFAULT_AVATAR =
    'https://img.freepik.com/free-icon/user_318-159711.jpg';

  return (
    <>
      <NavLink to="/users">
        <img
          className="arrow-back"
          src="/assets/svg/arrow-left.svg"
          alt="back to users"
        />
      </NavLink>
      {!user ? (
        <h1>User not found</h1>
      ) : (
        <Wrapper>
          <div className="user-login">{user.login}</div>
          <div className="user-info">
            <div className="user-avatar">
              <img
                src={user.avatar ? user.avatar : DEFAULT_AVATAR}
                alt="user-avatar"
              />
            </div>
            <div className="user-detail">
              <p>
                <span>{user.posts.length}</span> posts
              </p>
            </div>
            <div className="user-detail">
              <p style={{ textAlign: 'center' }}>
                <span>{user.followersCount}</span> folowers
              </p>
            </div>
            <div className="user-detail">
              <p style={{ textAlign: 'end' }}>
                <span>{user.followingsCount}</span> folowings
              </p>
            </div>
            {isPersonalPage && <UploadPost handleAddPost={handleAddPost} />}
            {!isPersonalPage &&
              (isFollow ? (
                <button onClick={handleToggleFollow} className="follow-btn" style={{backgroundColor: '#FE7171'}}>
                  Unfollow
                </button>
              ) : (
                <button onClick={handleToggleFollow} className="follow-btn">
                  Follow
                </button>
              ))}
          </div>

          <div className="posts">
            {user.posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default User;
