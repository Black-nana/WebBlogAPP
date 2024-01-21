import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import img2 from "../assets/jocke-wulcan-KLOW1bD616Y-unsplash.jpg";
import { TbLockAccess } from "react-icons/tb";
import { IoMdCloseCircle } from "react-icons/io";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const SignIn = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const{login} = useAuth();
  const navigate = useNavigate();
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        // Use the login function from useAuth
        await login(values.email, values.password);
        
        setSuccessMessage("Successfully logged in!");
        formik.resetForm();
        setOpenSnackbar(true);
        setTimeout(() => {
          setSuccessMessage(null);
          // Redirect the user to the home page after successful login
          navigate("/");
        }, 5000);
      } catch (error) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }

      setIsLoading(false);
    },
  });

  return (
    <div className="grid grid-cols-2 p-4 shadow-2xl">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
          {errorMessage}
        </Alert>
      </Snackbar>
      <div className="h-full relative ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img src={img2} alt="" className="h-screen w-full object-cover" />
        <p className="absolute top-1/3 p-20 text-white text-4xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam a
        </p>
      </div>
      <div className="h-screen w-full grid place-items-center ">
        <div className="w-3/4 grid p-2 h-3/4 border-2 shadow-2xl ">
          <div className="flex justify-end">
            <span className="text-slate-900 cursor-pointer">
            <Link to={"/"}> <IoMdCloseCircle className="text-3xl"/></Link>
            </span>
          </div>
          <div className="bg-green-400 w-full flex cursor-pointer items-center justify-center gap-2 text-white">
            <h2 className="text-4xl font-bold tracking-tight ">Sign In</h2>
            <span>
              <TbLockAccess className="text-5xl text-gray-600" />
            </span>
          </div>
         
          <form
            onSubmit={formik.handleSubmit}
            className="form-control w-full grid place-items-center"
          >
            <div className="w-full flex flex-col gap-3">
              <div className="w-full">
                <input
                  type="email"
                  placeholder="enter you email here"
                  className="input input-bordered w-full"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="username"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  className="input input-bordered w-full"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="transition-all duration-200 bg-green-400 btn w-full"
              disabled={!formik.isValid || isLoading}
            >
              {isLoading ? (
                <div className="">
                  <span className="loading loading-dots loading-lg text-green-500"></span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <Link
            to={"/signup"}
            className="w-full text-center capitalize  text-sm text-gray-500 font-mono cursor-pointer"
          >
            <h3>
              do you have an account?
              <span className=" uppercase border-b-2 border-t-2 border-green-600 cursor-pointer">
                sign up
              </span>
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
