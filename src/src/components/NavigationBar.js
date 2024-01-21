import React from "react";
// import { Link } from "react-router-dom";
import UserSection from "./UserSection";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const { user } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-green-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content h-screen mt-3 z-[1] p-2 shadow bg-base-100  w-60"
          >
            <li>
              <Link to={'/'}>Home</Link>
            </li>
           <li>
            {user && (
              <Link to={'/create-post'}>Create Post</Link>
            )}
           </li>
          </ul>
        </div>
        <Link to={'/'} className="btn bg-green-400 text-white hover:bg-green-500">WEEBBLOG</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li>
              <Link to={'/'}>Home</Link>
            </li>
           <li>
            {user && (
              <Link to={'/create-post'}>Create Post</Link>
            )}
           </li>
        </ul>
      </div>
      <div className="navbar-end pr-4">
        <UserSection />
      </div>
    </div>
  );
};

export default NavigationBar;
