import React, { useRef, createRef, useContext } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import RadioButton from '../input/radiobutton/RadioButton'
import Checkbox from '../input/checkbox/CheckBox'
import { updateSelection, updateDeselection } from '../../utils/table.utils'

const TableRows = () => {

    const {
        tableRowsData = [],
        tableHeaderData = [],
        tableRowSelectInputType,
        selectedRows = [], 
        updatedSelectedRows
        } = useContext(TableContext);
    
    const lineRefs = useRef([]);

    const onRowSelection = (rowData, isRowSelected, selectedRows) => {
        const { id } = rowData
        if (tableRowSelectInputType === 'radiobutton') {
            updatedSelectedRows(updateSelection(selectedRows, id, tableRowSelectInputType))
        } else if (tableRowSelectInputType === 'checkbox') {
          const selectedRows = (isRowSelected) ? 
            updateSelection(selectedRows || [], id, tableRowSelectInputType) 
            : updateDeselection(selectedRows, id)
          updatedSelectedRows(selectedRows)
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
                    console.log("In Component",selectedRows)
                    let isRowSelected = selectedRows.includes(id)
                    let rowSelectClass = isRowSelected ? 'selectedRow' : ''
                    const canSelectRow = !!(tableRowSelectInputType === 'radiobutton' || tableRowSelectInputType === 'checkbox')
                    lineRefs.current[index] = lineRefs.current[index] || createRef()
                    return (
                        <div className={`tableGrid--bodyRow ${rowSelectClass}`} onClick={ canSelectRow ? (e) => {
                            const isInputChecked = lineRefs.current[index].current.checked || false
                            onRowSelection(rowData, !isInputChecked, selectedRows) 
                        }: ()=>{}} key={`select-${id}`} >
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
                        {
                        (tableHeaderData.map( column => {
                            const { id, gridSelector } = column;
                            return(
                                <div className='tableGrid--bodyRow--dataCell' key={`${gridSelector}-bodyRow-${id}`}>
                                {rowData[gridSelector]}
                                </div>
                            )
                            }))
                        }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TableRows
