import React, { useState } from 'react';
import './CreateAccount.css'; // Import the CSS file 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import favicon from '../images/favicon.ico';
import Images from '../images/hero.jpeg';



function CreateAccount(setFormComponent) {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   toast.success("Successfully signed up with ShoreSync!");


  //   // Perform validation, check if passwords match, etc.
  //   console.log('Submitted:', { email, password, confirmPassword });
  //   // Reset form fields after submission
  //   setEmail('');
  //   setPassword('');
  //   setConfirmPassword('');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/register', {
        email: email,
        password: password
      });

      if (response.data.success) {
        toast.success("Successfully signed up with ShoreSync!");
        // Reset form fields after successful registration
        setTimeout(() => {
          // Reset form fields after successful registration
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          // Navigate to login page after a delay
          navigate('/Login');
        }, 2000); 
        // setFormComponent(0); // Redirect to login page

      } else {
        toast.error(response.data.message || "An error occurred during registration.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (

    <div className='test' style={{backgroundImage: `url(${Images})`, backgroundSize: '100% 100%' }}>
    <div className="account-container">
         <img src={favicon} alt="Logo" />
      <h2 >Sign Up to ShoreSync</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters"
            required
          />
          <small style={{ fontStyle: 'italic'}}>Password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters.</small>
        </div>
        <br></br>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            pattern={password}
            title="Password must match the above password"
            onChange={handleConfirmPasswordChange}
            required
          />
          
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
    </div>
    
  );
}

export default CreateAccount;
