import React, { useRef, createRef, useContext } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import RadioButton from '../input/radiobutton/RadioButton'
import Checkbox from '../input/checkbox/CheckBox'


const TableRows = () => {

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
                tableRowsData.length <=0 ?
                    <span>No data!</span>
                :
                tableRowsData.map( (rowData, index) => {
                const {id} = rowData
                let isRowSelected = getSelectedRowsIndex().includes(id)
                const canSelectRow = !!(tableRowSelectInputType === 'radiobutton' || tableRowSelectInputType === 'checkbox')
                lineRefs.current[index] = lineRefs.current[index] || createRef()
                return (
                    <div className='tableGrid--bodyRow' onClick={ canSelectRow ? (e) => {
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
