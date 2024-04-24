import React from 'react';
import './Footer.css';
import {  FaMicroscope,FaUniversity, FaBuilding } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <a href="https://www.vims.edu/ccrm/" target="_blank" className="footer-link">
        <FaMicroscope /> Center for Coastal Resources Management (CCRM)</a>
        <div className="separator"></div>
        <a href="https://www.vt.edu" target="_blank" className="footer-link">
        <FaUniversity /> Virginia Tech</a>
        <div className="separator"></div>
        <a href="https://www.vims.edu/" target="_blank" className="footer-link">
        <FaBuilding /> The Virginia Institute of Marine Science (VIMS)</a>
      </div>
    </div>
  );
};

export default Footer;
