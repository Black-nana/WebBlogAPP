// CommentForm.js
import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useAuth } from "../context/AuthContext";

const CommentForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCreateComment = async () => {
    setIsLoading(true);
    try {
      // Use JSONPlaceholder endpoint for creating posts
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          name,
          email,
          body,
          userId: user.id, // Replace with the appropriate user ID
        }
      );

      // Handle success, e.g., redirect to the newly created post or show a success message
        setSnackbarMessage("Comment created successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

      setSnackbarMessage(`Comment created: ${JSON.stringify(response.data)}`);
      console.log("Comment created:", response.data);
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      setSnackbarMessage("Error creating comment");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setIsLoading(false);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  return (
    <div className="container mx-auto my-8">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        Create Comment
      </h1>
      <form className="flex flex-col gap-4 max-w-xl mx-auto">
        <input
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500"
          rows="5"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          className="bg-slate-900 text-white font-semibold px-8 py-2 rounded-lg"
          type="submit"
          onClick={handleCreateComment}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-lg text-white"></span>
          ) : (
            "Create Comment"
          )}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
