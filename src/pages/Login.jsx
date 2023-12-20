// Login.js
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { RiKeyFill, RiMailFill } from "react-icons/ri";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Login form submitted with values:", values);
      const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));

      // Check if login details match
      if (
        storedUserDetails &&
        storedUserDetails.email === values.email &&
        storedUserDetails.password === values.password
      ) {
        navigate("/dashboard");
      } else {
        // Handle incorrect login details
        toast.error("Incorrect login details");
      }
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center ">
        <div className="col-xs-12 col-md-6 col-lg-4 shadow rounded-2 p-3">
          <h2 className="text-center my-4">Login</h2>
          <form onSubmit={formik.handleSubmit}>
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

            <button type="submit" className="btn btn-primary btn-block my-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
