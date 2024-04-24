import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa'; 
import favicon from '../images/favicon.ico';


const Header = () => {
  const navigate = useNavigate();


  const redirectPage = (props) => {
    sessionStorage.setItem('formComponent', 0);
    props.setFormComponent(0);

  }

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session storage or specific keys if needed
    // props.setFormComponent(1); // Optionally reset to the login form component index
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <div className="header">
      <img className="img" src={favicon} alt="Favicon" /> {/* Favicon */}
      <h1 className="welcome">Shoresync</h1>

      <div className="header-link-content">
        <a className="link" href="/" onClick={redirectPage}>
          <FaHome /> Home
        </a>
        <a className="link" href="/Login" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </a>
      </div>
    </div>
  );
}

export default Header;
