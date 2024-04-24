import Header from './components/Header';
import Footer from './components/Footer';
import LandUseForm from './components/LandUseForm';
import ShorelineFeaturesForm from './components/ShorelineFeatures';
import React from 'react';
import { useState, useEffect } from 'react';
import BankAttributesForm from './components/BankAttributesForm';
import FinalSubmitForm from './components/FinalSubmitForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Images from './images/hero.jpeg';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import ThanksPage from './components/ThanksPage';
import { toast } from 'react-toastify';




function App() {

  const [formComponent, setFormComponent] = useState(0);
  const [allFormsData, setAllFormsData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Set the initial value of formComponent when the component mounts
    var component = sessionStorage.getItem('formComponent');
    console.log("hi", component);

    if(component === null) {
      component = 0
      sessionStorage.setItem('formComponent', component);
    }
    setFormComponent(parseInt(component)); // Set it to 1 or any other initial value as needed

  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = sessionStorage.getItem('loggedIn');
    if (userLoggedIn) {
      setLoggedIn(true);
      setFormComponent(2);
    }
  }, []);

  useEffect(() => {
    console.log("Current form component:", formComponent);
  }, [formComponent]);



  const handleLogin = () => {

    sessionStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
    setFormComponent(0);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setFormComponent(0);  // Optionally reset form component on logout
    toast.info("You have been logged out.");
  };



  return (
      <div className='page' style={{backgroundImage: `url(${Images})`, backgroundSize: '100% 100%', height: formComponent !== 1 ? '100vh' : undefined  }}>

        <br/>

        <>
          {/* {!loggedIn && <Login setFormComponent={setFormComponent} />} */}
          <Header setFormComponent={setFormComponent}/>
          {formComponent === 0 && <LandUseForm setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
          {formComponent === 1 && <BankAttributesForm setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
          {formComponent === 2 && <ShorelineFeaturesForm setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
          {formComponent === 3 && <FinalSubmitForm setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
          {formComponent === 4 && <ThanksPage setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}

          {/* <Header onLogout={handleLogout} /> */}
          {/* {!loggedIn ? (
              <>
                {formComponent === 0 && <Login onLogin={handleLogin} />}
                {formComponent === 1 && <CreateAccount />}
              </>
            ) : (
              <>
                {formComponent === 2 && <LandUseForm setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
                {formComponent === 3 && <BankAttributesForm setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
                {formComponent === 4 && <ShorelineFeaturesForm setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
                {formComponent === 5 && <FinalSubmitForm setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
                {formComponent === 6 && <ThanksPage setFormComponent={setFormComponent} allFormsData={allFormsData} setAllFormsData={setAllFormsData} />}
              </>
            )} */}


          <ToastContainer />
          <br/>
          <Footer />
        </>

      </div>
  );
}



export default App;