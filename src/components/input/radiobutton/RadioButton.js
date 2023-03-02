import React, {useContext} from 'react';
import './radiobutton.css';
import { TableContext } from '../../../lib/contexts/TableContext'
import { updateSelection } from '../../../utils/table.utils'

const RadioButton = (props) => {
  let {
    selectedRows = [], 
    updatedSelectedRows
    } = useContext(TableContext);

  const customfn = (e) => {
    if (e.target.checked === true) {
      // selectedRows = []
      // selectedRows.unshift(Number(e.target.value))
      selectedRows = updateSelection(selectedRows, e.target.value, "radiobutton")
      updatedSelectedRows(selectedRows)
      console.log(selectedRows)
    } else {
      console.log("unchecked")
    }
  }
  const { innerRef, name, value, onSelect = customfn, checked } = props;

  return (
      <input ref={innerRef} type="radio"  name={name} id="outline"  onChange={onSelect} className="custom-radio" checked={checked} value={value} ></input>
  )
}

export default RadioButton
