import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../store/thunks';
import Auth from '../../containers/Auth';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ login: '', password: '' });
  const [errors, setErrors] = useState({
    login: null,
    password: null,
  });

  useEffect(() => {
    const errors = {};
    if (form.login.length) {
      errors.login = null;
    } else {
      errors.login = 'Login required!';
    }

    if (form.password.length) {
      errors.password = null;
    } else {
      errors.password = 'Password required!';
    }
    setErrors(errors);
  }, [form]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  return (
    <Auth>
      <form onSubmit={handleSubmit}>
        <Input
          label="Login"
          type="text"
          placeholder="Enter your login..."
          onChange={(e) => handleChange('login', e.target.value)}
          error={errors.login}
        />
        <InputPassword
          label="Password"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
        />
        <button type="submit" className="auth-btn">
          Sign In
        </button>
      </form>
      <div className='auth-bottom-text'>
        <span>If you not have account you can </span>
        <NavLink to="/registration">Registration</NavLink>
      </div>
    </Auth>
  );
};

export default Login;
