import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading,setIsLoading]=useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCreatePost = async () => {
    setIsLoading(true);
    try {
      //check if user is logged in
      if(!user){
        console.log("user not found");
        setSnackbarMessage('User not found');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        navigate('/login');
        //handle not logged in user redirect to login page
        return;
      }
      // Use JSONPlaceholder endpoint for creating posts
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body: content,
        userId: user.id, // Replace with the appropriate user ID
      });

      // Handle success, e.g., redirect to the newly created post or show a success message
      setSnackbarMessage('Post created');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setSnackbarMessage(`Post created: ${JSON.stringify(response.data)}`);
      console.log('Post created:', response.data);
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      setSnackbarMessage('Error creating post');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    setIsLoading(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div className="container mx-auto my-8">
       <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
       >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <h2 className="text-3xl font-bold mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleCreatePost}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleCreatePost}
          className="bg-slate-900 text-white p-2 rounded-md"
          disabled={isLoading}
        >
         {isLoading ? ( <span className="loading loading-dots loading-lg text-white"></span>):"Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
