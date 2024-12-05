import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",  // Use 'first_name' to match server expectations
    last_name: "",   // Use 'last_name' to match server expectations
    email: "",
    password: "",
    role: ""         // Add a role field to match server expectations
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
        role: formData.role
      });

      if (response.status === 201) {
        alert("Registration successful!");
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={formData.first_name}
            onChange={handleChange}
            name="first_name"
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={formData.last_name}
            onChange={handleChange}
            name="last_name"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            required
          />
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            placeholder="Enter Role (e.g., admin)"
            value={formData.role}
            onChange={handleChange}
            name="role"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
