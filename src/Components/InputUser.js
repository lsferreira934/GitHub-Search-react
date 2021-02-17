import React, { useState } from 'react';

export default function InputUser({ onValueInput }) {
  const [inputValue, setInputValue] = useState('');

  const handleValueInput = (event) => {
    setInputValue(event.target.value);
    if (event.key === 'Enter') {
      onValueInput(inputValue);
    }
  };

  return (
    <>
      <div className="input-field col s12 ">
        <input
          id="icon_prefix"
          type="text"
          autoFocus
          onKeyUp={handleValueInput}
        />
        <label htmlFor="icon_prefix">User GitHub</label>
      </div>
    </>
  );
}
