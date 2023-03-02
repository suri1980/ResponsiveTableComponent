import React, { useContext } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import Checkbox from '../input/checkbox/CheckBox'

const MiniTableHeader = () => {
    const {
        tableRowsData = [],
        tableRowSelectInputType = '',
        handleSelectAll,
        getSelectedRowsIndex,
        tableHeaderCaption = '',
        sortOptions,
        updateRowsData,
        updateSortOptions,
        selectedRows = [], 
        updatedSelectedRows
    } = useContext(TableContext)

    let selectedRowIndex = tableRowsData.map(row => row.id)

    const isAllRowsSelected = (selectedRowIndex?.length > 0 && selectedRowIndex?.length === selectedRows?.length)

  return (
    <div className='miniTableGrid--headerRow'>
        {
            (tableRowSelectInputType === 'checkbox') ? (
                <div className='tableGrid--headerRow--dataCell__select'> 
                    <Checkbox name="selection" checked={isAllRowsSelected} onSelect={(e) => {
                        let selectedRowIndex = tableRowsData.map(row => row['id'])
                        e.target.checked ? updatedSelectedRows(selectedRowIndex): updatedSelectedRows([])
                    }} />
               </div>
            ) : (<div className='tableGrid--headerRow--dataCell__select' />)
            }
        {
            <div className='miniTableGrid--headerRow--dataCell'>{tableHeaderCaption}</div>
        }
    </div>
  )
}

export default MiniTableHeader
