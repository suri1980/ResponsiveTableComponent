import React, { useContext } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import Checkbox from '../input/checkbox/CheckBox'

const TableHeader = () => {
    const {
        tableHeaderData = [],
        tableRowsData = [],
        tableRowSelectInputType = '',
        handleSelectAll,
        getSelectedRowsIndex
    } = useContext(TableContext)

    let selectedRowIndex = tableRowsData.map(row => row.id)

    const isAllRowsSelected = (getSelectedRowsIndex()?.length > 0 && getSelectedRowsIndex()?.length === selectedRowIndex?.length)

  return (
    <div className='tableGrid--headerRow'>
        {
            // (tableRowSelectInputType === 'radiobutton' || tableRowSelectInputType === 'checkbox') && (
            (tableRowSelectInputType === 'checkbox') ? (
                <div className='tableGrid--headerRow--dataCell__select'> 
                    <Checkbox name="selection" checked={isAllRowsSelected} onSelect={(e) => {
                        handleSelectAll(
                            e.target.checked
                        )
                    }} />
               </div>
            ) : (<div className='tableGrid--headerRow--dataCell__select' />)
            }
        {
            tableHeaderData.map( (data) => (
            <div key={data.gridSelector} className='tableGrid--headerRow--dataCell'>{data.name}</div>
            ))
        }
    </div>
  )
}

export default TableHeader
