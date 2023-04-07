import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/selectors";
import { useForm } from "react-hook-form";
import Input from '../../components/Input';
import { convertToBase64 } from "../../utils/convertToBase64";
import { updateCurrentUserThunk } from "../../store/thunks";

const DEFAULT_AVATAR = 'https://img.freepik.com/free-icon/user_318-159711.jpg';

const firstNameValidation = {
    required: {
        value: true,
        message: 'First name field is required!'
    },
    pattern: {
        value: /^[A-Za-z]+$/i,
        message: 'First name must contains only alphabet symbols!'
    },
};

const lastNameValidation = {
    required: {
        value: true,
        message: 'Last name field is required!'
    },
    pattern: {
        value: /^[A-Za-z]+$/i,
        message: 'Last name must contains only alphabet symbols!'
    },
};


const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const [avatar, setAvatar] = useState(user.avatar)
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
        }
    });

    const onSubmit = (data) => {
        dispatch(updateCurrentUserThunk({...data, avatar}))
    }

    const handelAvatarChange = async (e) => {
        const base64Url = await convertToBase64(e.target.files[0]);
        e.target.value = null;
        setAvatar(base64Url);
    }

    return (
        <div>
            <label>
                <img style={{width: 100}} src={avatar || DEFAULT_AVATAR} alt="avatart" />
                <input type="file" placeholder="avatart" onChange={handelAvatarChange} hidden/>  
            </label>  
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    label="First name"
                    type="text" 
                    placeholder="firstName" 
                    {...register('firstName', firstNameValidation)}
                    error={formState.errors.firstName}
                />
                <Input 
                    label="Last name"
                    type="text" 
                    placeholder="lastName" 
                    {...register('lastName', lastNameValidation)}
                    error={formState.errors.lastName}
                />
                <button type="submit" disabled={!formState.isValid && formState.isSubmitted}>Save</button>
            </form>
        </div>
    )
}

export default Profile;