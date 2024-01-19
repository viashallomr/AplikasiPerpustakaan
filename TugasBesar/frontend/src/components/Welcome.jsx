import React from 'react';
import { useSelector} from 'react-redux/es/hooks/useSelector';

const Welcome = () => {
    const {user} = useSelector((state) => state.auth);
  return (
    <div>
        <h1 className='title'>Dashboard</h1>
        <h2 className='subtitle'>Welcome Back <strong>{user && user.nama}</strong></h2>
    </div>
  );
};

export default Welcome;