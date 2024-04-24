import React from 'react';
import './RadioButtonItem.css'; // Import the CSS file

const RadioButtonItem = ({ name, checked, onChange }) => {
  return (
    <div className="radiobutton-item">
      <label>
        <input
          type="radio"
          checked={checked}
          onChange={() => onChange(name)}
        />
        {name}
      </label>
    </div>
  );
};

export default RadioButtonItem;