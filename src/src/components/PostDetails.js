// PostDetail.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [toggleComment, setToggleComment] = useState(false);

  const handleToggleComment = () => {
    setToggleComment(!toggleComment);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch post data from your API or data source
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className='w-full grid place-items-center'>
        <span className="loading loading-dots loading-lg text-green-400"></span>
      </div>
    ) // You can also handle the case when 'post' is undefined
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 border rounded shadow h-[62vh] overflow-scroll">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="mb-4">{post.body}</p>
      <div className="flex justify-between">
      <Link to={`/edit-post/${post.id}`}  className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4">
        Edit Post
      </Link>
      <button
        className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleToggleComment}
      >
        {toggleComment ? 'Hide Comments' : 'Show Comments'}
      </button>
      <Link to={"/commentForm"} className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4">
        comment
        </Link>
        </div>

      {toggleComment && <CommentSection postId={post.id} />}
    </div>
  );
}

export default PostDetail;
