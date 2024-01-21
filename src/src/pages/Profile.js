// UserProfile.js
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
//   const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useAuth();

useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            // Fetch user profile data from your API or data source
            // Use the authenticated user's id instead of the id from the URL
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}`);
            setUserProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    fetchUserProfile();
}, [ user.id]);

if (!userProfile) {
    return (
        <div className='w-full grid place-items-center'>
            <span className="loading loading-dots loading-lg text-green-400"></span>
        </div>
    );
}
if (!user) {
    // Redirect or handle the case where there is no authenticated user
    return <p>No user found. Please log in.</p>;
  }

  return (
    <div className='grid place-items-center w-full h-[70vh]'>
    <div className=' shadow-lg w-2/4 h-fit grid place-items-center gap-4 my-4 py-4'>
      <h2>{user.username}'s Profile</h2>

      {/* Display user details */}
      <p>Email: {user.email}</p>
      <p>Location: {user?.address?.city}, {user?.address?.zipcode}</p>

      {/* Additional user information */}
      <h3>About Me</h3>
      <p>catchPhrase: {user?.company?.catchPhrase}</p>

      {/* Add more sections based on your application's requirements */}
    </div>
    </div>
  );
};

export default UserProfile;
