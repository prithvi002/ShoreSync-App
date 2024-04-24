import React from 'react';
import './CheckBoxItem.css'; // Import the CSS file
import { Tooltip } from "../tooltip";
import Data from "../Data.json"

const CheckboxItem = ({ name, checked, onChange }) => {
  return (
    <div className="checkbox-item">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(name)}
        />
        {name}
      </label>
      &nbsp;
      {Data.LandUseData[name] && (
        <Tooltip text={Data.LandUseData[name]}>
          <span className="material-symbols-outlined small-info-icon">info</span>
        </Tooltip>
      )}
    </div>
  );
};

export default CheckboxItem;
