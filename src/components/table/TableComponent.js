import React, { useRef, useState } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import TableHeader from './Table.Header'
import TableRows from './Table.Rows'
import useViewport from '../../lib/hooks/useViewPort';
import MiniTableHeader from './Mini.Table.Header';
import MiniTableRows from './Mini.Table.Rows';

const TableComponent = (props) => {

    const { mediaWidth } = useViewport()
    const minTableWidth = 600

    const {
        datatype,
        tableHeaderData,
        tableData: data,
        tableHeaderCaption,
        tableFooterCaption,
        tableRowSelectInputType,
        totalColumns = 0,
    } = props

    const [tableRowsData, updateRowsData] = useState(data)
    const [sortOptions, updateSortOptions] = useState({
      sortBy: 'id',
      sortOrder: 'nuetral'
    })
    
    const [selectedRows, updatedSelectedRows] = useState([])
    
    const lineRefs = useRef([]);

    const tableContext = {
      datatype,
      tableHeaderData,
      tableRowsData,
      tableHeaderCaption,
      tableFooterCaption,
      tableRowSelectInputType,
      updateRowsData,
      totalColumns,
      mediaWidth,
      sortOptions,
      updateSortOptions,
      updatedSelectedRows,
      selectedRows
    }

  return (
    <TableContext.Provider value={tableContext}>
      {
        (mediaWidth < minTableWidth && totalColumns >= 4) ?
          <div className='mobileTableGrid'>
            <MiniTableHeader />
            <MiniTableRows />
          </div>
        : 
          <div className='tableGrid'>
            <TableHeader />
            <TableRows />
          </div>
      }
    </TableContext.Provider>
  )
}

export default TableComponent
