// landUseData.js
const landUseFormData = {
  landUseData: {
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
  },
  errorMessage: "Select atleast one option to continue."
};



const overallData = {
  height : {"0 - 5ft": false,
  "5 - 10ft": false,
  "10 - 30ft": false,
  "> 30ft": false,
},

stability : {
  stable: false,
  transitional: false,
  unstable: false,
  undercut: false,
}, 

cover: {
  bare: false,
  partial: false,
  total: false,
}, 

marsh: {
  yes: false,
  no: false,

}, 

beach: {
  yes: false,
  no: false,

}, 

phragmites: {
  yes: false,
  no: false,
}

};

export {landUseFormData, overallData};
