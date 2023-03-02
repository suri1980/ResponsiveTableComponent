import React, { useContext } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import Checkbox from '../input/checkbox/CheckBox'
import {sortTableRows} from '../../utils/table.utils'

const TableHeader = () => {
    const {
        tableHeaderData = [],
        tableRowsData = [],
        tableRowSelectInputType = '',
        handleSelectAll,
        getSelectedRowsIndex,
        sortOptions,
        updateRowsData,
        updateSortOptions,
    } = useContext(TableContext)

    // console.log(sortOptions)

    var { sortBy, sortOrder: orderBy} = sortOptions
    let selectedRowIndex = tableRowsData.map(row => row.id)
    const isAllRowsSelected = (getSelectedRowsIndex()?.length > 0 && getSelectedRowsIndex()?.length === selectedRowIndex?.length)

    const updateSortedRowsData = (sortedRowData) => {
        updateRowsData(sortedRowData)
    }

    const columnSortOrderUpdated =  ( sortBy, sortOrder) => {
        if (sortOrder === 'nuetral') { sortOrder = 'asc'}
        else if (sortOrder === 'asc') { sortOrder = 'desc'}
        else { sortOrder = 'asc'}

        updateSortOptions({
            sortBy: sortBy,
            sortOrder: sortOrder
        })

        const sortedRowData = sortTableRows(tableRowsData, sortBy, sortOrder)
        updateSortedRowsData(sortedRowData)
    }


  return (
    <div className='tableGrid--headerRow'>
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
            tableHeaderData.map( (data) => {
                const sortOrder = (data.gridSelector === sortBy) ? orderBy : 'neutral'
                return (
                    <div 
                        key={data.gridSelector} 
                        className='tableGrid--headerRow--dataCell'
                        >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        {data.name}
                        { 
                            data.sortable && (
                                <span className={sortOrder} onClick={ () => columnSortOrderUpdated(data.gridSelector,  orderBy) }></span>
                            )
                        }
                        
                    </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default TableHeader
