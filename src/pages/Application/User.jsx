import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../../services/api";
import PostCard from "../../components/PostCard";
import { useIndificate } from "../../hooks";
import Button from '../../components/Button';
import Input from "../../components/Input";

const UploadPost = ({
    handleAddPost
}) => {
    const [isOpenForm, setIsOpenForm] = useState(false);

    const handleOpenForm = () => setIsOpenForm(true);

    const handleCloseForm = () => setIsOpenForm(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, image } = e.target.elements;
        const body = {
            title: title.value,
            image: image.files[0],
        }

        api.createPost(body)
            .then(data => {
                handleAddPost(data);
                handleCloseForm();
            })
            .catch(err => {
                alert(err.message);
            })
    }

    if(!isOpenForm) {
        return (
            <Button onClick={handleOpenForm}>Upload</Button>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <br />
                <button onClick={handleCloseForm} type="button">Cancel</button>
                <Input name="title" label="Title" type="text" placeholder="Title..."/>
                <Input name="image" label="Photo" type="file" placeholder="Photo..."/>
                <button type="submit">Create post</button>
            <br />
        </form>
    )
}

const User = () => {
    const params = useParams();
    const isPersonalPage = useIndificate(params.userId);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleAddPost = (post) => {
        const newUser = {
            ...user,
            posts: [...user.posts, post],
        }

        setUser(newUser);
    }

    useEffect(() => {
        api.getUserById(params.userId)
            .then(user => setUser(user))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [])

    if(isLoading) return <h1>Loading...</h1>

    return (
        <>
             <NavLink to="/users">Back</NavLink>
             {isPersonalPage && <UploadPost handleAddPost={handleAddPost}/>}
             {
                !user ? 
                <h1>User  not found</h1> :
                (
                    <div>
                        Login: {user.login}
                        Email: {user.email}
                        {user.isFollow ? <button>Unfollow</button> : <button>Follow</button>}
                        <p>Posts:</p>
                        <div className="posts">
                            {user.posts.map(post => <PostCard post={post}/>)}
                        </div>
                    </div>
                )
             }
        </>
        
    )
}

export default User;