import React, { useContext } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import Checkbox from '../input/checkbox/CheckBox'

const MiniTableHeader = () => {
    const {
        tableRowsData = [],
        tableRowSelectInputType = '',
        handleSelectAll,
        getSelectedRowsIndex,
        tableHeaderCaption = ''
    } = useContext(TableContext)

    let selectedRowIndex = tableRowsData.map(row => row.id)

    const isAllRowsSelected = (getSelectedRowsIndex()?.length > 0 && getSelectedRowsIndex()?.length === selectedRowIndex?.length)

  return (
    <div className='miniTableGrid--headerRow'>
        {
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
            <div className='miniTableGrid--headerRow--dataCell'>{tableHeaderCaption}</div>
        }
    </div>
  )
}

export default MiniTableHeader
