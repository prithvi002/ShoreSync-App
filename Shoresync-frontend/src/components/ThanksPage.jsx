import React, { useEffect } from 'react';
import './ThanksPage.css';
// import { useHistory } from 'react-router-dom'; // If you're using React Router v5

const ThanksPage = ({ setFormComponent }) => {
    console.log("Rendering ThanksPage");
    useEffect(() => {
        const timer = setTimeout(() => {
            setFormComponent(0); // Reset to initial form component or redirect to home
        }, 4000);
        return () => clearTimeout(timer);
    }, [setFormComponent]);

    return (
        <div className = "thanks-wrapper">
            <div className = "thanks-container">
                <h1>Thanks for Submitting!</h1>
            </div>
        </div>
    );
}

export default ThanksPage;
