import React, { useEffect, useState } from 'react';
import Auth from '../../containers/Auth';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import api from '../../services/api';
import { useNavigate, NavLink } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: '', password: '', email: '' });
  const [errors, setErrors] = useState({
    login: null,
    email: null,
    password: null,
  });
  const [apiError, setApiError] = useState(null);

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

    if (form.email.length) {
      errors.email = null;
    } else {
      errors.email = 'Email required!';
    }
    setErrors(errors);
  }, [form]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.registration(form);
      navigate('/login');
    } catch (err) {
      setApiError(err.response.data);
    }
  };

  return (
    <Auth>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />
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
        {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        <button className="auth-btn" type="submit">
          Sign Up
        </button>
      </form>
      <div className="auth-bottom-text">
        <span>If you have account you can </span>
        <NavLink to="/login">Login</NavLink>
      </div>
    </Auth>
  );
};

export default Registration;
