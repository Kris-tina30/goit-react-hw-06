import React from 'react';

function SearchBox({ value, onChange }) {
  return (
    <div>
      <p>Find contacts by name</p>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}

export default SearchBox;
