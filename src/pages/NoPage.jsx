// SignUpPage.js
import React from "react";
import { Link } from "react-router-dom";
import { RiLockPasswordFill, RiUserFill, RiMailFill } from "react-icons/ri";

const NoPage = () => {
  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center ">
        <div className="col-xs-12 col-md-6 col-lg-4 shadow rounded-2 p-3">
          <h2 className="text-center my-4">Sign Up</h2>
          <form>
            <div className="form-group my-3">
              <label htmlFor="username">Username</label>
              <div className="input-group">
                <span className="input-group-text">
                  <RiUserFill />
                </span>

                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="form-group my-3">
              <label htmlFor="email">Email address</label>
              <div className="input-group">
                <span className="input-group-text">
                  <RiMailFill />
                </span>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="form-group my-3">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <RiLockPasswordFill />
                </span>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block my-2">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
