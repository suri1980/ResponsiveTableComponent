import React from 'react';
import './radiobutton.css';

const customfn = (e) => { console.log(e.target) }

const RadioButton = (props) => {
  const { innerRef, name, onSelect = customfn, checked } = props;

  return (
      <input ref={innerRef} type="radio"  name={name} id="outline"  onChange={e => onSelect(e)} className="custom-radio" checked={checked}></input>
  )
}

export default RadioButton
