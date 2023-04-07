import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../../containers/Header';
import Users from './Users';
import User from './User';
import Post from "./Post";
import Profile from "./Profile";
import Feed from "./Feed";

const Application = () => (
    <main>
        <Header/>
        <Routes path="/">
            <Route index element={<Feed/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="users/:userId" element={<User/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="post/:postId" element={<Post/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </main>
)

export default Application;