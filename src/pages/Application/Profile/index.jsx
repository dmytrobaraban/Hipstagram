import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors';
import { useForm } from 'react-hook-form';
import Input from '../../../components/Input';
import InputPassword from '../../../components/InputPassword';
import Wrapper from '../../../components/Wrapper';
import { convertToBase64 } from '../../../utils/convertToBase64';
import { updateCurrentUserThunk, updatePasswordThunk } from '../../../store/thunks';
import './style.css';

const DEFAULT_AVATAR = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

const validation = {
  firstName: {
    required: {
      value: true,
      message: 'First name field is required!',
    },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: 'First name must contains only alphabet symbols!',
    },
  },
  lastName: {
    required: {
      value: true,
      message: 'Last name field is required!',
    },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: 'Last name must contains only alphabet symbols!',
    },
  },
  login: {
    required: {
      value: true,
      message: 'Login field is required!',
    },
    pattern: {
      value: /^[a-zA-Z0-9_]{2,30}$/,
      message:
        'Login must contain only letters, numbers or underscores and be between 2 and 30 characters long!',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Email field is required!',
    },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message:
        'Email should contain a valid email address in the format "example@example.com',
    },
  },
  password: {
    required: {
      value: true,
      message: 'Password field is required!',
    },
  },
};

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [avatar, setAvatar] = useState(user.avatar);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      email: user.email,
    },
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: passwordFormState,
  } = useForm();

  const onSubmitInfo = (data) => {
    dispatch(updateCurrentUserThunk({ ...data, avatar }));
  };

  const onSubmitPassword = (data) => {
    dispatch(updatePasswordThunk({ ...data }));
  };

  const handelAvatarChange = async (e) => {
    const base64Url = await convertToBase64(e.target.files[0]);
    e.target.value = null;
    setAvatar(base64Url);
  };

  return (
    <Wrapper>
      <div className="profile-container">
        <form onSubmit={handleSubmit(onSubmitInfo)} className="profile-info">
          <label className="input-photo">
            <img src={avatar || DEFAULT_AVATAR} alt="avatar" />
            <Input
              type="file"
              label="Change photo"
              onChange={handelAvatarChange}
            />
          </label>
          <Input
            label="First name"
            type="text"
            placeholder="First name"
            {...register('firstName', validation.firstName)}
            error={formState.errors.firstName}
          />
          <Input
            label="Last name"
            type="text"
            placeholder="Last name"
            {...register('lastName', validation.lastName)}
            error={formState.errors.lastName}
          />
          <Input
            label="Login"
            type="text"
            placeholder="Login"
            {...register('login', validation.login)}
            error={formState.errors.login}
          />
          <Input
            label="Email"
            type="text"
            placeholder="Email"
            {...register('email', validation.email)}
            error={formState.errors.email}
          />
          <button
            type="submit"
            disabled={!formState.isValid && formState.isSubmitted}
            className="submit-info"
          >
            Save profile
          </button>
        </form>
        <form
          onSubmit={handlePasswordSubmit(onSubmitPassword)}
          className="profile-password"
        >
          <InputPassword
            label="Password"
            type="password"
            placeholder="Enter your password..."
            {...passwordRegister('password')}
            error={passwordFormState.errors.password}
          />
          <InputPassword
            label="Confirm password"
            type="password"
            placeholder="Confirm your password..."
            {...passwordRegister('confirmPassword')}
          />
          <button type="submit" className="submit-info">
            Save password
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Profile;
