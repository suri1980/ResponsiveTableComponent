import React, { useRef, useState } from 'react'
import TableComponent from '../components/table/TableComponent'

export default {
    title: 'Components/Table Component',
    component: TableComponent,
    argTypes: {

    }
}


const tableHeaderCaption = "This is table head caption"
const tableFooterCaption = "This is table foot caption"
const tableRowSelectInputType = "checkbox"

const headerData = [
  {
    name: "Operator",
    gridSelector: 'operator',
    sortable: true
  },
  {
    name: "Headset Display",
    gridSelector: 'headsetDisplay',
    sortable: true
  },
  {
    name: "3G Availability",
    gridSelector: 'threeGAvailability',
    sortable: true
  },
  {
    name: "Desination",
    gridSelector: 'destination',
    sortable: false
  }
];

const tableData = [
  {
    id: 1,
    operator: "Celcom Axiata (LTE)",
    headsetDisplay: "CELCOM / My Celcom / 502 19",
    threeGAvailability: "Yes",
    destination: 'Singapore'
  },
  {
    id: 2,
    operator: "DiGi Telecom (LTE)",
    headsetDisplay: "DiGi 1800 / DiGi /  MYMY18",
    threeGAvailability: "Yes",
    destination: 'China1'
  },
  {
    id: 3,
    operator: "Maxis (LTE)",
    headsetDisplay: "U Mobile / MYS 18 / MY 18",
    threeGAvailability: "No",
    destination: 'Australia'
  },
  {
    id: 4,
    operator: "U Mobile (LTE)",
    headsetDisplay: "U Mobile / MYS 18 / MY 18",
    threeGAvailability: "Yes",
    destination: 'India'
  }
];


const Template = (args) => <TableComponent {...args} />

export const StandardTable = Template.bind({})

StandardTable.args = {
    headerData,
    tableData,
    tableHeaderCaption,
    tableFooterCaption,
    tableRowSelectInputType,
    totalColumns:4
};

