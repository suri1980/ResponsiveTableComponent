import React, { useRef, useState, useEffect, createRef, useMediaPredicate } from 'react'
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
    const [selectedRowsIndex, updateSelectedRowsIndexState] = useState([])
    const [sortOptions, updateSortOptions] = useState({
      sortBy: 'id',
      sortOrder: 'nuetral'
    })
    const lineRefs = useRef([]);

    const getSelectedRowsIndex = () => {
      let currentRowIndexes = []
      if (selectedRowsIndex) {
        currentRowIndexes = [...new Set(selectedRowsIndex)]
      }
      return currentRowIndexes
    }

    const onRowSelection = (rowData) => {
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
      updateRowsData,
      getSelectedRowsIndex,
      onRowSelection,
      totalColumns,
      mediaWidth,
      sortOptions,
      updateSortOptions,
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
