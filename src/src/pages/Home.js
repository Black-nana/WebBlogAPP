// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostList from "../components/PostList";
import Cat from "../components/Cat";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Render an error message in the UI or use a notification library
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
        <PostList posts={posts} />
        </div>
        <div className="col-span-1">
        <Cat />
        </div>
      </div>
    </div>
  );
};

export default Home;
