// EditForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "react-bootstrap";

const EditForm = ({ user, onUpdate, isUpdating }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // Add validation for other fields if needed
  });

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      // Add other fields as needed
    },
    validationSchema,
    onSubmit: (formVal) => {
      onUpdate(user, formVal);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="form-control"
        />
        {formik.touched.name && formik.errors.name && (
          <div>{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="form-control"
        />
        {formik.touched.username && formik.errors.username && (
          <div>{formik.errors.username}</div>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="form-control"
        />
        {formik.touched.email && formik.errors.email && (
          <div>{formik.errors.email}</div>
        )}
      </div>

      {/* Add other fields as needed */}

      <div className="mt-3 d-flex justify-content-end">
        {isUpdating ? (
          <Spinner variant="dark" size="md"></Spinner>
        ) : (
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default EditForm;
