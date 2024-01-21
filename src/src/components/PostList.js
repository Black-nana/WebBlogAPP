// PostList.js
import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
    console.log(posts);
  return (
    <div className="container mx-auto mt-8 h-[80vh] overflow-scroll">
      <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="text-3xl font-bold mb-4">No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4 border-2 w-2/3 shadow-xl p-4">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p>{post.body}</p>
              <Link to={`/post/${post.id}`} className="text-blue-500 mt-2 block">
                Read More
              </Link> 
               
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default PostList;
