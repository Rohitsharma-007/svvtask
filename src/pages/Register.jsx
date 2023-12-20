// EditForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RiLockPasswordFill,
  RiUserFill,
  RiMailFill,
  RiKeyFill,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Register = () => {
  const navaigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("password is required"),
    // Add validation for other fields if needed
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      // Add other fields as needed
    },
    validationSchema,
    onSubmit: (formVal, { resetForm }) => {
      localStorage.setItem("userDetails", JSON.stringify(formVal));
      toast.success("User registered successfully");
      resetForm({
        values: {
          name: "",
          username: "",
          email: "",
          password: "",
        },
      });
      navaigate("/login");
    },
  });

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center ">
        <div className="col-xs-12 col-md-6 col-lg-4 shadow rounded-2 p-3">
          <h2 className="text-center my-4">Sign Up</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group my-3">
              <label>Name</label>
              <div className="input-group">
                <span className="input-group-text">
                  <RiUserFill />
                </span>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-group my-3">
              <label htmlFor="username">Username:</label>
              <div className="input-group">
                <span className="input-group-text">
                  <RiUserFill />
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="form-control"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <div className="text-danger">{formik.errors.username}</div>
              )}
            </div>

            <div className="form-group my-3">
              <label htmlFor="email">Email:</label>
              <div className="input-group">
                <span className="input-group-text">
                  <RiMailFill />
                </span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="form-control"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group my-3">
              <label htmlFor="password">Password:</label>
              <div className="input-group">
                <span className="input-group-text">
                  <RiKeyFill />
                </span>
                <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="form-control"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            {/* Add other fields as needed */}

            <button type="submit" className="btn btn-primary btn-block my-2">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default Register;
