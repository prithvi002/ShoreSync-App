
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import './ShorelineFeatures.css'; // Import the CSS file
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from "../tooltip";
import Data from "../Data.json"



const erosionControlOptions = [
  { label: "Riprap (L)", value: "riprapL" },
  { label: "Bulkhead (L)", value: "bulkheadL" },
  { label: "Dilapidated Bulkhead (L)", value: "DilapidatedBulkheadL" },
  { label: "Breakwaters (L)", value: "breakwatersL" },
  { label: "Groinfield (L)", value: "groinfieldL" },
  { label: "Jetty (P)", value: "jettyP" },
  { label: "Unconventional (L)", value: "unconventionalL" },
  { label: "Debris (L)", value: "debrisL" },
  { label: "Marsh Toe Revetment (L)", value: "MarshToeRevetmentL" },
  { label: "Seawall (L)", value: "seawallL" },

];

const recreactionalOptions = [
  { label: "Pier (P)", value: "pierP" },
  { label: "Dilapidated Pier (P)", value: "DilapidatedPierP" },
  { label: "Wharf (L)", value: "wharfL" },
  { label: "Boat Ramp (P)", value: "boatRampP" },
  { label: "Boat House (P)", value: "boatHouseP" },
  { label: "Marina (L)", value: "MarinaL" },
  { label: "Outfall (P)", value: "outfallP" },
];

const othersOptions = [
    { label: "Outfall (P)", value: "outfallP" },
];

const ShorelineFeaturesForm = (props) => {
  const [erosionStructers, setSelectedErosionControlOptions] = useState([]);
  const [recreationalStructures, setSelectedRecreactionalOptions] = useState([]);
  const [otherOptions, setSelectedOtherOptions] = useState([]);


  const handleCheckboxChange = (name) => {
          setSelectedErosionControlOptions(name);
          sessionStorage.setItem('erosionStructers', JSON.stringify(name));
  }

  const handleCheckboxChange1 = (name) => {
    setSelectedRecreactionalOptions(name);
    sessionStorage.setItem('recreationalStructures', JSON.stringify(name));

  }

  const handleCheckboxChange2 = (name) => {
    setSelectedOtherOptions(name);
    sessionStorage.setItem('otherOptions', JSON.stringify(name));

}

const handleContinueClick = () => {
    const validations = [
      {
        id: 'erosionControlError',
        condition: erosionStructers.length === 0,
        message: 'Please select at least one Erosion Control Structure.'
      },
      {
        id: 'recreationalError',
        condition: recreationalStructures.length === 0,
        message: 'Please select at least one Recreational Structure.'
      }
    ];
  
    validations.forEach(validation => {
      if (validation.condition) {
        toast.error(validation.message, {toastId: validation.id});
      }
    });
  
    // If no errors, proceed with logic
    if (!validations.some(validation => validation.condition)) {
      console.log('Selected Erosion Control Structures:', erosionStructers);
      sessionStorage.setItem('erosionStructers', JSON.stringify(erosionStructers));

      console.log('Selected Recreational Structures:', recreationalStructures);
      sessionStorage.setItem('recreationalStructures', JSON.stringify(recreationalStructures));

      console.log('Selected other:', otherOptions);
      sessionStorage.setItem('otherOptions', JSON.stringify(otherOptions));

      
      // Use a callback function in setAllFormsData to log the updated value
      props.setAllFormsData(prevData => {

        //Data from LandUseForm (page 1)
        const landUse = JSON.parse(sessionStorage.getItem('landUse'));

        //Data from BankAttributesForm (page 2)
        const heightItem = (sessionStorage.getItem('heightItem'));
        const bankStability = (sessionStorage.getItem('bankStability'));
        const bankCover = (sessionStorage.getItem('bankCover'));
        const marshBuffer = (sessionStorage.getItem('marshBuffer'));
        const bankBuffer = (sessionStorage.getItem('bankBuffer'));
        const phragmitesAustralis = (sessionStorage.getItem('phragmitesAustralis'));
        const BankAttributesData = {heightItem,bankStability, bankCover, marshBuffer, bankBuffer, phragmitesAustralis }

        //Data from FinalSubmitForm (page 4)
        const longitude= sessionStorage.getItem('longitude');
        const latitude = sessionStorage.getItem('latitude');
        const image = sessionStorage.getItem('compressedImage');
        const FinalSubmitForm = {longitude, latitude, image};

        const previousData = { landUse, BankAttributesData, FinalSubmitForm};
        const updatedDatas = { ...previousData, ShoreLineFeaturesData: {erosionStructers, recreationalStructures, otherOptions}};


        sessionStorage.setItem('allFormsData', JSON.stringify(updatedDatas));
        console.log("All Forms Data: ", JSON.parse(sessionStorage.getItem('allFormsData')));
        return updatedDatas;
      });


      // Add your logic here for what happens when the user clicks Continue
      toast.dismiss('erosionControlError');
      toast.dismiss('recreationalError');
      props.setFormComponent(3);
    }
  };

  const handlePrevious = () => {
    props.setFormComponent(1);
    sessionStorage.setItem('formComponent', 1);
    toast.dismiss('erosionControlError');
    toast.dismiss('recreationalError');
  };


  const handleReset = () => {
    setSelectedErosionControlOptions([]);
    setSelectedRecreactionalOptions([]);
    setSelectedOtherOptions([]);

    sessionStorage.removeItem('erosionStructers');
    sessionStorage.removeItem('recreationalStructures');
    sessionStorage.removeItem('otherOptions');
  };

  useEffect(() => {
    if(sessionStorage.getItem('erosionStructers') !== null ){
    var recieved = sessionStorage.getItem('erosionStructers');
    var parsedRecieved = JSON.parse(recieved);
    setSelectedErosionControlOptions(parsedRecieved);
    }

    if(sessionStorage.getItem('recreationalStructures') !== null ){
    var recieved1 = sessionStorage.getItem('recreationalStructures');
    var parsedRecieved1 = JSON.parse(recieved1);
    setSelectedRecreactionalOptions(parsedRecieved1);

    }

    if(sessionStorage.getItem('otherOptions') !== null ){
    var recieved2 = sessionStorage.getItem('otherOptions');
    if(recieved2 !== null){
    var parsedRecieved2 = JSON.parse(recieved2);
    setSelectedOtherOptions(parsedRecieved2);
    }
    }

    // console.log("This is upon starting of the page ", JSON.parse(sessionStorage.getItem('allFormsData')));
    sessionStorage.setItem('formComponent', 2);
   
  },[]);  





  


  return (
    
    <div className="form-container" style={{paddingBottom: '60px'}}>
    <h2 className="form-header">Shoreline Features</h2>
    <form>
      <h4 className="tooltip-display">{Data.ShoreLineFeaturesData.erosionControl.lable_heading}
      &nbsp;
      <Tooltip text={Data.ShoreLineFeaturesData.erosionControl.tool_lable}>
        <span className="material-symbols-outlined small-info-icon" >info</span>
      </Tooltip>
      </h4>
      {/* <pre>{JSON.stringify(erosionStructers)}</pre> */}
      <MultiSelect
        options={erosionControlOptions}
        value={erosionStructers}
        onChange={handleCheckboxChange}
        labelledBy="Select Erosion Control Structures"
      />
  
      <h4 className="tooltip-display">{Data.ShoreLineFeaturesData.recreational.lable_heading}
      &nbsp;
      <Tooltip text={Data.ShoreLineFeaturesData.recreational.tool_lable}>
        <span className="material-symbols-outlined small-info-icon" >info</span>
      </Tooltip>
      </h4>
      {/* <pre>{JSON.stringify(recreationalStructures)}</pre> */}
      <MultiSelect
        options={recreactionalOptions}
        value={recreationalStructures}
        onChange={handleCheckboxChange1}
        labelledBy="Select Recreactional Structures"
      />

       <h4>{Data.ShoreLineFeaturesData.other.lable_heading}</h4>
       {/* <pre>{JSON.stringify(otherOptions)}</pre> */}
       <MultiSelect
        options={othersOptions}
        value={otherOptions}
        onChange={handleCheckboxChange2}
        labelledBy="Select Other"
        
        
       
       />

      <br></br>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button type="reset" onClick={handlePrevious} className="form-button">Previous</button>
          &nbsp;
          &nbsp;
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

export default ShorelineFeaturesForm;