// UserSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const UserSection = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className='grid place-items-end'>
         <div className='flex items-center justify-center gap-4'>
        
         <Link to={`/user/${user.id}`}>
          <span>{user.name}</span>
          <div className="avatar">
            <div className="rounded-full w-10 h-10 m-1">
              <img src="https://i.pravatar.cc/500?img=32" alt="User Avatar" />
            </div>
          </div>
          </Link>
          </div> 
         
          <button onClick={()=>{logout(user.id)}} className='border-b-2 border-green-400'>Logout</button>
        </div>
      ) : (
        <Link to={'/signin'} className='border-b-2 border-green-400'>Login</Link>
      )}
    </div>
  );
};

export default UserSection;
