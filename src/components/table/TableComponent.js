import React, { useRef, useState, useEffect, createRef, useMediaPredicate } from 'react'
import { TableContext } from '../../lib/contexts/TableContext'
import TableHeader from './Table.Header'
import TableRows from './Table.Rows'
import useViewport from '../../lib/hooks/useViewPort';
import MiniTableHeader from './Mini.Table.Header';
import MiniTableRows from './Mini.Table.Rows';

const TableComponent = (props) => {

 
    // const {mediaWidth} = useViewport()

    // console.log(width)

    const { mediaWidth } = useViewport()
    const minTableWidth = 600

    const {
        datatype,
        tableHeaderData,
        tableData: tableRowsData,
        tableHeaderCaption,
        tableFooterCaption,
        tableRowSelectInputType,
        sortable = false,
        totalColumns = 0,
    } = props

    const [tableData, updateRowsData] = useState(tableRowsData)
    const [selectedRowsIndex, updateSelectedRowsIndexState] = useState([])
    const [sortOption, updateSortOptions] = useState({
      sortable,
      by: 'id',
      order: 'asc'
    })
    const lineRefs = useRef([]);

    const getSelectedRowsIndex = () => {
      let currentRowIndexes = []
      if (selectedRowsIndex) {
        currentRowIndexes = [...new Set(selectedRowsIndex)]
      }
      //console.log(`Selected Rows - ${selectedRowsIndex}`)
      //console.log(currentRowIndexes)
      return currentRowIndexes
    }

    const onRowSelection = (rowData) => {
      //console.log(rowData)
      //console.log(getSelectedRowsIndex())
    }

    const updateSelectedRowsIndex = (newRowIndex, selectRow = true) => {
      if (tableRowSelectInputType === 'radiobutton') {
        updateSelectedRowsIndexState([newRowIndex])
        return;
      }

      if (selectRow) {
        updateSelectedRowsIndexState([
          ...getSelectedRowsIndex(),
          newRowIndex
        ]);
      } else {
        const currentRowIndexes = getSelectedRowsIndex()
        const unCheckedRowIndex = currentRowIndexes.indexOf(newRowIndex);
        currentRowIndexes.splice(unCheckedRowIndex, 1);
        updateSelectedRowsIndexState([
          currentRowIndexes
        ])
      }
    }
    
    const tableContext = {
      datatype,
      tableHeaderData,
      tableRowsData,
      tableHeaderCaption,
      tableFooterCaption,
      tableRowSelectInputType,
      getSelectedRowsIndex,
      onRowSelection,
      totalColumns,
      mediaWidth,
      handleSelectAll: (isSelected) => {
        let selectedRowIndex = []
        selectedRowIndex = tableRowsData.map(row => row['id'])
        updateSelectedRowsIndexState(
          ...(
            isSelected ? [selectedRowIndex] : []
          )
        )
      },
      updateSelectedRowsIndex: (newRowIndex, selectRow = true) => {
        if (tableRowSelectInputType === 'radiobutton') {
          updateSelectedRowsIndexState([newRowIndex])
          return;
        }
  
        if (selectRow) {
          updateSelectedRowsIndexState([
            ...getSelectedRowsIndex(),
            newRowIndex
          ]);
        } else {
          const currentRowIndexes = getSelectedRowsIndex()
          const unCheckedRowIndex = currentRowIndexes.indexOf(newRowIndex);
          currentRowIndexes.splice(unCheckedRowIndex, 1);
          updateSelectedRowsIndexState([
            currentRowIndexes
          ])
        }
      }
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
