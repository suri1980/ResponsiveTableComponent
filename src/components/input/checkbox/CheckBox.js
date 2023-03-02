import React from 'react';
import './checkbox.css';

const customfn = (e) => { console.log(e.target) }

const Checkbox = (props) => {
  const { innerRef, name, onSelect = customfn, checked } = props;
  return (
      <input ref={innerRef} type="checkbox" name={name} onChange={e => onSelect(e)} checked={checked} />
  )
}

export default Checkbox