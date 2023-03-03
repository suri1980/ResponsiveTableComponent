import React, { useRef, createRef, useContext } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import RadioButton from '../input/radiobutton/RadioButton'
import Checkbox from '../input/checkbox/CheckBox'
import { updateSelection, updateDeselection } from '../../utils/table.utils'

const MiniTableRows = () => {
  const {
    datatype,
    tableRowsData = [],
    tableHeaderData = [],
    tableHeaderCaption,
    tableFooterCaption,
    tableRowSelectInputType,
    rowsSelectionType,
    getSelectedRowsIndex,
    updateSelectedRowsIndex,
      selectedRows = [], 
      updatedSelectedRows
    } = useContext(TableContext);

const lineRefs = useRef([]);

const onRowSelection = (rowData, isRowSelected, selectedRows) => {
    const { id } = rowData
    if (tableRowSelectInputType === 'radiobutton') {
        updatedSelectedRows(updateSelection(selectedRows, id, tableRowSelectInputType))
    } else if (tableRowSelectInputType === 'checkbox') {
      const rowsSelected = (isRowSelected) ? 
        updateSelection(selectedRows || [], id, tableRowSelectInputType) 
        : updateDeselection(selectedRows, id)
      updatedSelectedRows(rowsSelected)
    }
}
return (
    <div>
        {
          tableRowsData.length <=0 ?
          <span>No data!</span>
          :
            tableRowsData.map( (rowData, index) => {
              const {id} = rowData
              let isRowSelected = selectedRows.includes(id)
              let rowSelectClass = isRowSelected ? 'selectedRow' : ''
              const canSelectRow = !!(tableRowSelectInputType === 'radiobutton' || tableRowSelectInputType === 'checkbox')
              lineRefs.current[index] = lineRefs.current[index] || createRef()
              return (
                  <div className={`miniTableGrid--bodyRow ${rowSelectClass}`} onClick={ canSelectRow ? (e) => {
                    const isInputChecked = lineRefs.current[index].current.checked || false
                    onRowSelection(rowData, !isInputChecked, selectedRows) 
                  }: ()=>{}} key={`select-${id}`}>
                  {
                  tableRowSelectInputType === 'radiobutton' && (
                      <div className='tableGrid--bodyRow--dataCell__select' >
                      <RadioButton innerRef={lineRefs.current[index]} key={`radio-${id}`} name="selection" checked={isRowSelected} value={id} />
                      </div>
                  )
                  }
                  {
                    tableRowSelectInputType === 'checkbox' && (
                        <div className='tableGrid--bodyRow--dataCell__select'>
                        <Checkbox innerRef={lineRefs.current[index]} key={`checkbox-${id}`} name="selection" checked={isRowSelected} value={id} />
                        </div>
                    )
                  }
                  <div className="miniTableGrid--bodyRow--dataCell">
                    {
                    (tableHeaderData.map( column => {
                        const { name, gridSelector } = column;
                        return(
                          <div className='miniTableGrid--bodyRow-dateCell--data' key={`${gridSelector}-bodyRow-${id}`}>
                            <div className='miniTableGrid--bodyRow-dateCell--dataKey'>
                              {`${name} :`}
                            </div>
                            <div className='miniTableGrid--bodyRow-dateCell--dataValue'>
                              ${rowData[gridSelector]}
                            </div>
                          </div>
                        )
                        }))
                    }
                  </div>
                </div>
              )
            })
        }
    </div>
)
}



export default MiniTableRows
