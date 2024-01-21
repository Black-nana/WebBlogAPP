
import React,{useState} from "react";
import img2 from "../assets/jocke-wulcan-KLOW1bD616Y-unsplash.jpg";
import {  TbLockAccessOff } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from 'yup';


const Signup = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const formik = useFormik({
  
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      last_name: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
    
      const simulateAsyncOperation = () => new Promise(resolve => setTimeout(resolve, 2000));
    
      try {
        await simulateAsyncOperation();
        alert(JSON.stringify(values, null, 2));
        setSuccessMessage("Successfully logged in!");
        formik.resetForm();
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } catch (error) {
        alert(error.message);
      }
    
      setIsLoading(false);
    },
    
  });

  return (
    <div className=" grid grid-cols-2 p-4 shadow-2xl">
      <div className="h-screen relative ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img src={img2} alt="" className="h-screen w-full object-cover" />
        <p className="absolute top-1/3 p-20 text-white text-4xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam a
        </p>
      </div>
      <div className="h-screen w-full grid place-items-center ">
        <div className="w-3/4 grid p-2 h-fit border-2 shadow-2xl ">
        <div className="flex justify-end">
            <span className="text-slate-900 cursor-pointer my-2">
            <Link to={"/"}> <IoMdCloseCircle className="text-3xl"/></Link>
            </span>
          </div>
          <div className="bg-green-400 py-4 w-full flex cursor-pointer items-center justify-center gap-2 text-white">
            <h2 className="text-4xl font-bold tracking-tight ">Create Account</h2>
            <span>
            <TbLockAccessOff className="text-5xl text-gray-600"/>
            </span>
          </div>
          {/* successMessage */}
          <div>
            {successMessage && (
              <div className="text-white bg-green-300 p-2 mt-2 rounded">
                {successMessage}
              </div>
            )}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form-control w-full grid place-items-center my-2"
          >
            <div className="w-full flex flex-col gap-3">
            <div className="w-full">
                <input
                  type="text"
                  placeholder="enter you first name here"
                  className="input input-bordered w-full"
                  id="first_name"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="first_name"
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="enter you last name here"
                  className="input input-bordered w-full"
                  id="last_name"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="last_name"
                  
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
                ) : null}
              </div>
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
                  autoComplete="email"

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
              className="transition-all duration-200 bg-green-400 btn w-full my-2"
              disabled={!formik.isValid || isLoading}
            >
              {isLoading ? (
                <div className="">
                  <span className="loading loading-dots loading-lg text-green-500"></span>
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <Link to={'/signin'} className="w-full text-center capitalize  text-sm text-gray-500 font-mono cursor-pointer">
            <h3>
             I have an account?
              <span className=" uppercase border-b-2 border-t-2 border-green-600 cursor-pointer">
                LogIn
              </span>
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
