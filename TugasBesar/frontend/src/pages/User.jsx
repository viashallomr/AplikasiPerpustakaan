import React, {useEffect} from 'react'
import Layout from './Layout'
import UserList from '../components/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state => state.auth));

    useEffect(()=>{
        dispatch(getMe());
    }, [dispatch]);

    useEffect(()=>{
        if (isError) {
            navigate("/");
        }
        if(user && user.role !== "admin"){
            navigate("/users");
        }
    }, [isError, user,  navigate]);
  return (
    <Layout>
        <UserList />
    </Layout>
  );
};

export default User;