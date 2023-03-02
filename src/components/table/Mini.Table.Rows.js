import React, { useRef, createRef, useContext } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import RadioButton from '../input/radiobutton/RadioButton'
import Checkbox from '../input/checkbox/CheckBox'

const MiniTableRows = () => {
  const {
    datatype,
    tableRowsData = [],
    tableHeaderData = [],
    tableHeaderCaption,
    tableFooterCaption,
    tableRowSelectInputType,
    rowsSelectionType,
    onRowSelection,
    getSelectedRowsIndex,
    updateSelectedRowsIndex
    } = useContext(TableContext);
const lineRefs = useRef([]);

const updateSelectedSingleRow = (rowId) => {
    updateSelectedRowsIndex(rowId)
    }

const updateSelectedMultipleRows = (rowId) => {
updateSelectedRowsIndex(rowId)
}

const updateDeselectedRow = (rowId) => {
updateSelectedRowsIndex(rowId, false)
}

const updatedSelectStatus = (rowData, isRowSelected) => {
    const { id } = rowData
    if (tableRowSelectInputType === 'radiobutton') {
        updateSelectedSingleRow(id)
    } else if (tableRowSelectInputType === 'checkbox') {
        const updateSelectedRowsMethod = (isRowSelected) ? updateSelectedMultipleRows : updateDeselectedRow;
        updateSelectedRowsMethod(id);
    }
    onRowSelection(rowData);
}

return (
    <div>
        {
            tableRowsData.map( (rowData, index) => {
            const {id} = rowData
            let isRowSelected = getSelectedRowsIndex().includes(id)
            const canSelectRow = !!(tableRowSelectInputType === 'radiobutton' || tableRowSelectInputType === 'checkbox')
            lineRefs.current[index] = lineRefs.current[index] || createRef()
            return (
                <div className='miniTableGrid--bodyRow' onClick={ canSelectRow ? (e) => {
                const isInputChecked = lineRefs.current[index].current.checked || false
                console.log(rowData)
                console.log(lineRefs.current[index])
                updatedSelectStatus(rowData, !isInputChecked) 
                }: ()=>{}} key={`select-${id}`}>
                {
                tableRowSelectInputType === 'radiobutton' && (
                    <div className='tableGrid--bodyRow--dataCell__select' >
                    <RadioButton innerRef={lineRefs.current[index]} key={`radio-${id}`} name="selection" checked={isRowSelected} />
                    </div>
                )
                }
                {
                tableRowSelectInputType === 'checkbox' && (
                    <div className='tableGrid--bodyRow--dataCell__select'>
                    <Checkbox innerRef={lineRefs.current[index]} key={`checkbox-${id}`} name="selection" checked={isRowSelected} />
                    </div>
                )
                }
                <div class="miniTableGrid--bodyRow--dataCell">
                  {
                  (tableHeaderData.map( column => {
                      const { name, gridSelector } = column;
                      return(
                        <div className='miniTableGrid--bodyRow-dateCell--data'>
                          <div className='miniTableGrid--bodyRow-dateCell--dataKey'>
                            {name}
                          </div>
                          <div className='miniTableGrid--bodyRow-dateCell--dataValue'>
                            {rowData[gridSelector]}
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
