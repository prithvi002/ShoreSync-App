import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import favicon from '../images/favicon.ico';
import Images from '../images/hero.jpeg';




function Login({setFormComponent}) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCreateAccountClick = () => {
    // setFormComponent(1); // Update this to the index for the CreateAccount component
    navigate ('/CreateAccount');
  };


  //  // Dummy email and password for testing
  //  const dummyEmail = 'test@example.com';
  //  const dummyPassword = '@Test123456';

  const handleSubmit = async (e) => {
    //  uncomment here!!!!
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password: password })
      });
      const data = await response.json();

     
      if (response.ok) {
        toast.success(data.message);
        setTimeout(() => {
          sessionStorage.setItem('authToken', data.token); // Save token to session storage
          // Redirect to the home page or first form component after a delay
          navigate('/');
        }, 2000);


        // setFormComponent(2); // Assuming 2 is the index for LandUseForm


      } else {
        toast.error(data.message);
        setPassword(''); // Clear password field
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
  }

  

};

  return (
     
    <div className='test' style={{backgroundImage: `url(${Images})`, backgroundSize: '100% 100%' }}>
      
    <div className="login-container">
        <img src={favicon} alt="Logo" />
      <form onSubmit={handleSubmit}>
      
        <div>  
        <h2>Login to ShoreSync</h2>
          <label htmlFor="username">Email Address</label>
          <br></br>
          <input
            type="email"
            id="username"
            value={username}    
            placeholder="your@example.com"
            onChange={handleUsernameChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter 8 character or more"
            onChange={handlePasswordChange}
            required
          />
        </div>
    
        
        <button type="submit">Log In</button>
        <br></br> 
       
        <p>Don't have an account? <button onClick={handleCreateAccountClick} className="link-button">Create one</button></p>
        

        
        <br></br>
      </form>
      <ToastContainer />
    </div>
     </div>
  );
}

export default Login;