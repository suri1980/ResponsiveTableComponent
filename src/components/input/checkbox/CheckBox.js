import React, {useContext} from 'react';
import './checkbox.css';
import { TableContext } from '../../../lib/contexts/TableContext'
import { updateSelection, updateDeselection } from '../../../utils/table.utils'



const Checkbox = (props) => {

  let {
    selectedRows = [], 
    updatedSelectedRows
    } = useContext(TableContext);
  
    const customfn = (e) => {
      let val = e.target.value
      if (e.target.checked === true) {
        selectedRows = updateSelection(selectedRows, val, "checkbox")
        updatedSelectedRows([...new Set(selectedRows)])
      } else {
        selectedRows = updateDeselection(selectedRows, val)//selectedRows.filter(i => i !== Number(val))
        updatedSelectedRows(selectedRows)
      }
    }
    

  const { innerRef, name, onSelect = customfn, checked, value } = props;
  return (
      <input ref={innerRef} type="checkbox" name={name} onChange={onSelect}  checked={checked} value={value} />
  )
}

export default Checkbox