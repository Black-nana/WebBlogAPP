// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // When the page loads, check if there's a user stored in local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    // If there is, set the user state
    if (storedUser) {
      setUser(storedUser);
    }
    
     // Fetch comments from JSONPlaceholder when the component mounts
     const fetchComments = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/comments');
          const data = await response.json();
          setComments(data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
  
      fetchComments();
  }, []);

  const login = async (email, password) => {
    try {
      // Fetch all users from JSONPlaceholder
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');

      // Find a user with the provided email and "password"
      const authenticatedUser = response.data.find(user => user.email === email && user.username === password);

      if (authenticatedUser) {
        // Authentication successful
        console.log('Login successful', authenticatedUser);
        setUser(authenticatedUser); // Set the authenticated user in the context

        // Store the user's information in local storage
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
      } else {
        // No user found with the provided email and "password"
        console.error('Invalid email or password');
      }
    } catch (error) {
      // Handle login error
      console.error('Error during login:', error.message);
    }
  };

  const logout = (id) => {
    // Implement your logout logic here
    // Clear the user state upon logout
    if(user && user.id === id){
      setUser(null);

      // Remove the user's information from local storage
      localStorage.removeItem('user');
    }
    else{
      console.log('Cannot logout: No user is logged in with the provided id');
    }
  };
  const sampleCategories = ['Technology', 'Science', 'Travel', 'Food'];

  return (
    <AuthContext.Provider value={{ user, comments,login, logout,sampleCategories }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};