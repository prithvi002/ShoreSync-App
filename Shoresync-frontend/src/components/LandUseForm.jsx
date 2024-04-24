import React, {useEffect, useState} from 'react';
import CheckboxItem from './CheckBoxItem';
import './LandUseForm.css'; // Import the CSS file
import {landUseFormData} from '../app-static-data/appdata';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandUseForm = (props) => {
  const customId = "landUseFormToastId";

  const [checkedItems, setCheckedItems] = useState(landUseFormData.landUseData);


    const handleCheckboxChange = (name) => {
      setCheckedItems((prevCheckedItems) => {
        const updatedCheckedItems = {
          ...prevCheckedItems,
          [name]: !prevCheckedItems[name],
        };


        sessionStorage.setItem('landUse', JSON.stringify(updatedCheckedItems));
        // console.log("Updated checked items:", updatedCheckedItems);
        return updatedCheckedItems;
      });   
    };





  const handleContinueClick = () => {
    console.log('Checked Items:', checkedItems);  
    // Check if at least one item is checked
    const isAtLeastOneChecked = Object.values(checkedItems).some(value => value === true);
    if (isAtLeastOneChecked) {
      toast.dismiss(customId);

      //session storage updated
      sessionStorage.setItem('landUse', JSON.stringify(checkedItems));

      //Updates allFormsData object by retreiving other pages items using session storage and adding current updated data from LandUseForm
      props.setAllFormsData(prevData => {
          
          //Data from BankAttributesForm (page 2)
          const heightItem = (sessionStorage.getItem('heightItem'));
          const bankStability = (sessionStorage.getItem('bankStability'));
          const bankCover = (sessionStorage.getItem('bankCover'));
          const marshBuffer = (sessionStorage.getItem('marshBuffer'));
          const bankBuffer = (sessionStorage.getItem('bankBuffer'));
          const phragmitesAustralis = (sessionStorage.getItem('phragmitesAustralis'));
          const BankAttributesData = {heightItem,bankStability, bankCover, marshBuffer, bankBuffer, phragmitesAustralis }

          //Data from ShoreLineFeatures (page 3)
          const erosionStructers = JSON.parse(sessionStorage.getItem('erosionStructers'));
          const recreationalStructures = JSON.parse(sessionStorage.getItem('recreationalStructures'));
          const otherOptions = JSON.parse(sessionStorage.getItem('otherOptions'));
          const ShoreLineFeaturesData = {erosionStructers, recreationalStructures, otherOptions}

          //Data from FinalSubmitForm (page 4)
          const longitude= sessionStorage.getItem('longitude');
          const latitude = sessionStorage.getItem('latitude');
          const image = sessionStorage.getItem('compressedImage');
          const FinalSubmitForm = {longitude, latitude, image};

          //compiling previous data and adding LandUseForm data to the updatedData
          const previousData = { BankAttributesData, ShoreLineFeaturesData, FinalSubmitForm};
          const updatedDatas = { ...previousData, landUse: checkedItems};


        sessionStorage.setItem('allFormsData', JSON.stringify(updatedDatas));
        console.log("AllFormsData: ", JSON.parse(sessionStorage.getItem('allFormsData')));
        return updatedDatas;
      });

      //setting form to next form 
      props.setFormComponent(1);
    } else {
      // alert("Select atleast One");
      toast.error(landUseFormData.errorMessage, {toastId: customId});
    }
  };
  


  const handleReset = () => {
    setCheckedItems({
      "Forest": false,
      "Scrub shrub": false,
      "Grass": false,
      "Agriculture": false,
      "Residential": false,
      "Commercial": false,
      "Industrial": false,
      "Marsh island": false,
      "Bare lot": false,
      "Timbered clear cuts": false,
      "Paved areas": false,
      "Unknown land use": false,
    });
    sessionStorage.removeItem('landUse');
    // Create a copy of the data object
    // const newData = { ...props.allFormsData };
    // // Delete the key from the copy
    // delete newData[keyToDelete];
    // // Update the state with the modified data
    // setData(newData);
  };

  useEffect(() => {
    if(sessionStorage.getItem('landUse') !== null ){
    var recieved = sessionStorage.getItem('landUse');
    var parsedRecieved = JSON.parse(recieved);
    setCheckedItems(parsedRecieved); 

    // console.log("This is upon starting of the page ", JSON.parse(sessionStorage.getItem('allFormsData')));
    }  
    sessionStorage.setItem("formComponent", 0);

  },[]);   



  return (
    <div className="form-container" style={{paddingBottom: '80px'}}>
      <h2 className="form-header">Check the corresponding riparian land use classes</h2>
      <form>
        {Object.entries(checkedItems).map(([key, value]) => (
          <CheckboxItem
            key={key}
            name={key}
            checked={value}
            onChange={handleCheckboxChange}
          />
        ))}
        {/* <button type="button" onClick={handleContinueClick} className="form-button">
          Continue
        </button> */}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>

          <button type="button"  onClick={handleContinueClick} className="form-button">
            Continue
          </button>
          &nbsp;
          &nbsp;
          <button type="reset" onClick={handleReset} className="form-button">Reset</button>
      </div>
      </form>
    </div>
  );
};

export default LandUseForm;
