// EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading,setIsLoading]=useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
 



  useEffect(() => {
    const fetchPostData = async () => {
        setIsLoading(true);
      try {
        // Use JSONPlaceholder endpoint for fetching a specific post
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const postData = response.data;

        setTitle(postData.title);
        setContent(postData.body);
        // Fetch additional fields and set state accordingly
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
      setIsLoading(false);
    };

    fetchPostData();
  }, [id]);

  const handleEditPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Use JSONPlaceholder endpoint for updating posts
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title,
        body: content,
        // Include additional fields as needed
      });

      // Handle success, e.g., redirect to the updated post or show a success message
      console.log('Post updated:', response.data);
      setOpenSnackbar(true);
        
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle error, e.g., display an error message to the user
    }
    setIsLoading(false);
};

    const handleSnackbarClose = (event,reason) => {
        if (reason === 'clickaway') {
            return;
      }
      setOpenSnackbar(false);
  };

  return (
    <div className="container mx-auto my-8">
        <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Post updated successfully"
        anchorOrigin={
            {vertical:'top', horizontal:'center'}
        }
        action={
            <React.Fragment>
            <button className='text-green-500' onClick={handleSnackbarClose}>
                Close
            </button>
            </React.Fragment>
        }
        />
        
     {isLoading ? (
        <div className='w-full grid place-items-center'>
           <span className="loading loading-dots loading-lg text-green-400"></span>
        </div>
      ) : (
        <div className="w-full max-w-2xl px-4 py-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">Edit post</h1>

          <form className="mt-6" onSubmit={handleEditPost}>
            <div>
              <label className="block text-sm text-gray-800 dark:text-gray-200" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter a title"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-800 dark:text-gray-200" htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Enter some content"
                rows="5"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                onClick={handleEditPost}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-700 focus:outline-none"
              >
                Edit post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPost;
