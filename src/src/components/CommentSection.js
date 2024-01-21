// CommentSection.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const CommentSection = () => {
    const { comments } = useAuth();
  return (
    <div className=" ">
      <h3 className='font-bold'>Comments</h3>
      <ul className=' my-3 grid place-items-center gap-4'>
        {comments.map((comment) => (
          <li key={comment.id} className='bg-green-400 p-2 rounded-lg'>
            <div>
                <h3 className='font-bold'>Name: {comment.name}</h3>
            </div>
            <div>
            <strong>{comment.email}</strong>: {comment.body}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
