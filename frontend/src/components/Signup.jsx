import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    contactNumber: '',
    warehouseLocation: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/signup',
        formData
      );
      alert(response.data);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        contactNumber: '',
        warehouseLocation: ''
      });
    } catch (error) {
      if (error.response) alert(error.response.data);
      else alert('Network error');
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      contactNumber: '',
      warehouseLocation: ''
    });
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Official Email ID" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Store Manager">Store Manager</option>
        </select>
        <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <input type="text" name="warehouseLocation" placeholder="Warehouse Location" value={formData.warehouseLocation} onChange={handleChange} required />
        <button type="submit">Register</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default Signup;
