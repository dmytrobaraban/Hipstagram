import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initThunk } from './store/thunks';
import Auth from './pages/Auth';
import Application from './pages/Application';

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initThunk());
  }, []);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return isAuth ? <Application /> : <Auth />;
};

export default App;
