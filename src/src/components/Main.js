import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Footer from "../components/Footer";
import UserProfile from "../pages/Profile";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import{AuthProvider} from "../context/AuthContext";
import PostDetail from "./PostDetails";
import CommentSection from "./CommentSection";
import CommentForm from "./CommentForm";

const Main = () => {
 
  return (
    <div>
        <Router>
          <AuthProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/create-post" element={<CreatePost/>} />
            <Route path="/edit-post/:id" element={<EditPost/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/comment-section" element={<CommentSection />}/>
            <Route path="/commentForm" element={<CommentForm/>}/>
            
          </Routes>
          <Footer />
          </AuthProvider>
        </Router>
    </div>
  );
};

export default Main;
