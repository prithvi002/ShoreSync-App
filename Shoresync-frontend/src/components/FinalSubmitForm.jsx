import React, {useEffect, useRef, useState} from 'react';
import './FinalSubmitForm.css'; // Import the CSS file
import Compressor from 'compressorjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageCompression from 'browser-image-compression';

const FinalSubmitForm = (props) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [location, setLocation] = useState(null);
    const [compressedFile, setCompressedFile] = useState(null);
    const [uniqueNumber, setUniqueNumber] = useState(0);

    const handleFileChange = (event) => {

        //Sets the original image
        const files = Array.from(event.target.files);
        setSelectedFiles(files.filter(file => file.type === 'image/jpeg' || file.type === 'image/png'));

        // Original images size
        files.map((file, index) => (
                console.log("Image Size: ", file.size/1024)
            )
        );

        //Compresses the images received and saves it to session storage
        files.map((image, index) => (
            new Compressor(image, {
                quality: 0.8,
                success: (compressedResult) => {
                    setCompressedFile(compressedResult)
                    console.log('compression size: ', compressedResult.size/1024);
                    console.log('compression result: ', compressedResult);
                    //use session storage to receive already existing
                    const alreadyExistingImages = sessionStorage.getItem('compressedImage');

                    if(alreadyExistingImages != null){
                        const compressedImages = [alreadyExistingImages, compressedResult];
                        sessionStorage.setItem('compressedImage', compressedImages);
                    } else {
                        sessionStorage.setItem('compressedImage', compressedResult);
                    }

                },
            })
        ));


    }

    function handleLocationClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        console.log('location',location);

        sessionStorage.setItem('longitude', longitude);
        sessionStorage.setItem('latitude', latitude);
    }


    let unumber = 0;
    const generateUniqueNumber=async()=>   {
        unumber = Math.floor(Math.random() * 1000000);
        //setUniqueNumber(sixDigitNumber);
        console.log("unique number generated::", unumber)

    }


    function error() {
        console.log("Unable to retrieve your location");
    }

    const sendFormData = () => {
        console.log("Object in SendFormData", props.allFormsData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(JSON.parse(sessionStorage.getItem('allFormsData'))),
        };


        console.log("bob");
        fetch("http://localhost:5001/api/addFormData",  requestOptions)
            .then(response =>
                response.json())
            .then (console.log)
            .then(data => {
                console.log("data",data)

            })
    }

    const [selectedFiles1, setSelectedFiles1] = useState(null);

    const handleFileChange1 = (event) => {
        setSelectedFiles1(event.target.files);
    };



    const sendImages = async(event) => {
        /*const formData = new FormData();
        formData.append("image", sessionStorage.getItem('compressedImage'));
        // formData.append("txid",1);
        const requestOptions = {
            method: 'POST',
            /!*headers: { 'Content-Type': 'image/jpeg' },*!/
            /!*headers: { 'Content-Type': 'multipart/form-data' },*!/
            body: JSON.stringify(formData),
        };
        fetch("http://localhost:5001/api/addImages",  requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("data",data)
            })*/

        // event.preventDefault();

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }



        var files = sessionStorage.getItem('compressedImage');
        const formData = new FormData();
        console.log("uniqueNumber",unumber);
        formData.append("txid",unumber);
        for (let i = 0; i < selectedFiles.length; i++) {
            const compressedFile = await imageCompression(selectedFiles[i], options);
            formData.append('image', compressedFile);
        }
        //formData.append("image",sessionStorage.getItem('compressedImage'));
        try {
            const response = await fetch('/api/addImages', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Response is not OK');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSubmitClick = async() => {

        if(!sessionStorage.getItem('latitude')){
            toast.error("Synchronize GPS Coordinates",{toastId: "locationError"});
        }if(!sessionStorage.getItem('compressedImage')){
            toast.error("Upload an image",{toastId: "imageError"});
        }else {

            var sixDigitNumber = Math.floor(Math.random() * 1000000);
            setUniqueNumber(sixDigitNumber);
            //page one
            const landUse = JSON.parse(sessionStorage.getItem('landUse'));

            //page two
            const heightItem = (sessionStorage.getItem('heightItem'));
            const bankStability = (sessionStorage.getItem('bankStability'));
            const bankCover = (sessionStorage.getItem('bankCover'));
            const marshBuffer = (sessionStorage.getItem('marshBuffer'));
            const bankBuffer = (sessionStorage.getItem('bankBuffer'));
            const phragmitesAustralis = (sessionStorage.getItem('phragmitesAustralis'));
            const BankAttributesData = {
                heightItem,
                bankStability,
                bankCover,
                marshBuffer,
                bankBuffer,
                phragmitesAustralis
            }


            //page 3
            const erosionStructers = JSON.parse(sessionStorage.getItem('erosionStructers'));
            const recreationalStructures = JSON.parse(sessionStorage.getItem('recreationalStructures'));
            const otherOptions = JSON.parse(sessionStorage.getItem('otherOptions'));
            const ShoreLineFeaturesData = {erosionStructers, recreationalStructures, otherOptions}


            //page 4- current page
            const longitude = sessionStorage.getItem('longitude');
            const latitude = sessionStorage.getItem('latitude');
            const compressedImage = sessionStorage.getItem('compressedImage');

            const isAtLeastOneChecked = Object.values(landUse).some(value => value === true);


            //validation of every page
            if (isAtLeastOneChecked) {

                if (heightItem !== null && bankStability !== null && bankCover !== null && marshBuffer !== null && bankBuffer !== null && phragmitesAustralis !== null) {
                    if (erosionStructers != null && recreationalStructures != null) {
                        if (longitude != null && latitude != null && compressedImage != null) {


                            props.setAllFormsData(prevData => {

                                const previousData = {landUse, BankAttributesData, ShoreLineFeaturesData}
                                const updatedData = {
                                    ...previousData,
                                    FinalSubmitForm: {longitude: sessionStorage.getItem('longitude'), latitude: sessionStorage.getItem('latitude'), image: sessionStorage.getItem('compressedImage'), txnid:unumber}
                                };



                                sessionStorage.setItem('allFormsData', JSON.stringify(updatedData));
                                console.log("All Forms Data: ", JSON.parse(sessionStorage.getItem('allFormsData')));
                                console.log("prop data", props.allFormsData);
                                return updatedData;
                            });

                            //   console.log(props.allFormsData);

                            sendFormData()
                            sendImages()
                            sessionStorage.clear();
                        }
                    }
                }
            }


            toast.dismiss('locationError');
            props.setFormComponent(4);


        }

    };

    const handleReset = () => {
        sessionStorage.removeItem('longitude');
        sessionStorage.removeItem('latitude');
        sessionStorage.removeItem('compressedImage');
        setLocation(null);
        setSelectedFiles(null);
        setCompressedFile(null)

    };

    const handlePrevious = () => {
        props.setFormComponent(2);
        sessionStorage.setItem('formComponent', 4);
    }


    useEffect(() => {

        console.log("This is upon starting of the page ", JSON.parse(sessionStorage.getItem('allFormsData')));
        console.log("latty", sessionStorage.getItem('latitude'));
//   console.log("Page location", location.latitude);

        const existingImages = sessionStorage.getItem('compressedImage');
        console.log("heij", existingImages);

        generateUniqueNumber()

        sessionStorage.setItem('formComponent', 3);

    });


    return (
        <div className="form-container">
            <h2 className="form-header">Upload Location and Images</h2>

            <h4 className="form-text">Click here to Synchronize GPS location</h4>
            <button type="button" className="form-button" onClick={handleLocationClick}>
                Synchronize GPS
            </button>
            {sessionStorage.getItem('latitude') &&
                <div>


                    <label htmlFor="Latitude" >
                        Latitude: {sessionStorage.getItem('latitude')} &nbsp; &nbsp;
                    </label>


                    <label htmlFor="Longitude" >
                        Longitude: {sessionStorage.getItem('longitude')}
                    </label>
                </div>}





            <div className="upload-container">
                <h4 className="form-text">Click here to Upload Images</h4>

                <button className="upload-button">
                    <label htmlFor="file-upload">
                        Upload Images
                        <input id="file-upload" type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                    </label>
                </button>


                {/* Input element for file upload */}
                <input id="file-upload" type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                {/* Render selected files */}
                <div className="uploaded-files">
                    {selectedFiles &&
                        selectedFiles.map((file, index) => (
                            <div key={index} className="uploaded-file">
                                <img src={URL.createObjectURL(file)} alt={file.name} className="thumbnail" />
                                <span>{file.name}</span>

                            </div>
                        ))}
                </div>

            </div>
            <div>
                {/* <button type="button" className="form-button2"> */}

                {/* <button type="button" className="form-button2">
            Submit Final Data
            </button> */}
                <button type="reset" onClick={handlePrevious} className="form-button">Previous</button>
                &nbsp;
                &nbsp;
                <button type="reset" onClick={handleReset} className="form-button">Reset</button>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <button type="button"  onClick={handleSubmitClick} className="form-button2">
                    Submit Final Data
                </button>


            </div>


        </div>
    );
};

export default FinalSubmitForm