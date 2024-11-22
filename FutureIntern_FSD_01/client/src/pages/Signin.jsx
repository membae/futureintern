import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_Token", data.access_token); // Store access token
        localStorage.setItem("refresh_Token", data.refresh_token); // Store refresh token
        localStorage.setItem("userId", data.user.id); // Store user ID
        setUserId(data.user.id);
        navigate("/users"); // Navigate to the Users page
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("Sign-in failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/user/${userId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("access_Token")}`, // Use the stored access token
            },
          });

          const data = await response.json();
          if (response.ok) {
            console.log("User Data:", data);
          } else {
            console.error("Error fetching user data:", data);
          }
        } catch (error) {
          console.error("Fetch user error:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

      {error && <div className="bg-red-200 text-red-600 p-2 rounded mb-4">{error}</div>}

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={`w-full py-3 px-4 bg-gray-900 text-white font-bold rounded-md ${loading || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
            >
              {loading || isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="flex space-x-2 p-2 items-center">
              <p>Forgot password?</p>
              <Link to="/reset-password" className="text-blue-600 underline">Reset</Link>
            </div>

            <div className="flex space-x-2 p-2 items-center">
              <p>Not registered?</p>
              <Link to="/signup" className="text-blue-600 underline">Sign Up</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
