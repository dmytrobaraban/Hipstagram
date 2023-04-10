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
    for (const key in form) {
      if (key === 'login') {
        if (!form[key].trim()) {
          errors[key] = 'Login required!';
        } else if (!/^[a-zA-Z0-9_]{2,30}$/.test(form[key])) {
          errors[
            key
          ] = `Login must contain only letters, numbers or underscores and be between 2 and 30 characters long!`;
        } else {
          errors[key] = null;
        }
      } else if (key === 'password') {
        if (!form[key].trim()) {
          errors[key] = 'Password required!';
        } else if (!/^[a-zA-Z0-9]{8,16}$/.test(form[key])) {
          errors[key] =
            'password must has min 8 symbols, max 16 symbols, only digital letters and literal letters';
        } else {
          errors[key] = null;
        }
      }
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
        {errors && (
          <p style={{ color: 'red' }}>
            {errors.login ? errors.login : errors.password}
          </p>
        )}
        <button type="submit" className="auth-btn">
          Sign In
        </button>
      </form>
      <div className="auth-bottom-text">
        <span>If you not have account you can </span>
        <NavLink to="/registration">Registration</NavLink>
      </div>
    </Auth>
  );
};

export default Login;
