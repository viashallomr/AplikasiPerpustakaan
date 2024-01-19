import React, {useEffect} from 'react'
import Layout from './Layout';
import BukuList from '../components/BukuList';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Buku = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth));

    useEffect(()=>{
        dispatch(getMe());
    }, [dispatch]);

    useEffect(()=>{
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);
  return (
    <Layout>
        <BukuList />
    </Layout>
  );
};

export default Buku;