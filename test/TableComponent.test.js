import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import React from 'react';
import TableComponent from '../src/components/table/TableComponent';

describe('TableComponentTest tests', () => {
    it('Should return No Data!', () => {
        render(<TableComponent noRowDataComponent={(<span>No data!</span>)} />);
        const noDataMessage = screen.getByText(/No data!/i);
        expect(noDataMessage).toBeInTheDocument();
    });

    it('should return multi select records with valid data', () => {
        const tableHeaderData = [{
            label: 'Name',
            gridSelector: 'name'
          }, {
            label: 'Mobile',
            gridSelector: 'mobile'
          }]
          
          const tableRowsData = [{
            id: 1,
            name: 'Mavis Chen',
            mobile: '8899-7654',
          }, {
            id: 2,
            name: 'Rodney Artichoke',
            mobile: '9988-7676',
          }, {
            id: 3,
            name: 'Valentino Morose',
            mobile: '7900-7654',
          }, {
            id: 4,
            name: 'Eric Widget',
            mobile: '5899-7654',
          }]

        render(<TableComponent tableHeaderData={tableHeaderData} tableData={tableRowsData} tableRowSelectInputType="checkbox" />);
        const firstRecord = screen.getByText(/Mavis Chen/i);
        expect(firstRecord).toBeInTheDocument();
        const secondRecord = screen.getByText(/Valentino Morose/i);
        expect(secondRecord).toBeInTheDocument();
        const thirdRecord = screen.getByText(/Eric Widget/i);
        expect(thirdRecord).toBeInTheDocument();
    });


    it('should return single select records with valid data', () => {
        const tableHeaderData = [{
            name: "Operator",
            gridSelector: 'operator',
          },
          {
            name: "Headset Display",
            gridSelector: 'headsetDisplay'
          },
          {
            name: "3G Availability",
            gridSelector: 'threeGAvailability'
          },
          {
            name: "Desination",
            gridSelector: 'destination'
          }]
          
          const tableRowsData = [{
            id: 1,
            operator: "Celcom Axiata",
            headsetDisplay: "CELCOM / My Celcom / 502 19",
            threeGAvailability: "Yes",
            destination: 'China'
          },
          {
            id: 2,
            operator: "DiGi Telecom",
            headsetDisplay: "DiGi 1800 / DiGi /  MYMY18",
            threeGAvailability: "Yes",
            destination: 'China1'
          },
          {
            id: 3,
            operator: "Maxis",
            headsetDisplay: "U Mobile / MYS 18 / MY 18",
            threeGAvailability: "Yes",
            destination: 'China2'
          }]

        render(<TableComponent tableHeaderData={tableHeaderData} tableData={tableRowsData} tableRowSelectInputType="radiobutton" />);
        const headRecord = screen.getByText(/Operator/i);
        expect(headRecord).toBeInTheDocument();
        const firstRecord = screen.getByText(/Celcom Axiata/i);
        expect(firstRecord).toBeInTheDocument();
        const secondRecord = screen.getByText(/DiGi Telecom/i);
        expect(secondRecord).toBeInTheDocument();
        const thirdRecord = screen.getByText(/Maxis/i);
        expect(thirdRecord).toBeInTheDocument();
    });


    it('should return with valid data without selection option(radio/checkbox)', () => {
        const tableHeaderData = [{
            name: "Operator",
            gridSelector: 'operator',
          },
          {
            name: "Headset Display",
            gridSelector: 'headsetDisplay'
          },
          {
            name: "3G Availability",
            gridSelector: 'threeGAvailability'
          },
          {
            name: "Desination",
            gridSelector: 'destination'
          }]
          
          const tableRowsData = [{
            id: 1,
            operator: "Celcom Axiata",
            headsetDisplay: "CELCOM / My Celcom / 502 19",
            threeGAvailability: "Yes",
            destination: 'China'
          },
          {
            id: 2,
            operator: "DiGi Telecom",
            headsetDisplay: "DiGi 1800 / DiGi /  MYMY18",
            threeGAvailability: "Yes",
            destination: 'China1'
          },
          {
            id: 3,
            operator: "Maxis",
            headsetDisplay: "U Mobile / MYS 18 / MY 18",
            threeGAvailability: "Yes",
            destination: 'China2'
          }]

        render(<TableComponent tableHeaderData={tableHeaderData} tableData={tableRowsData} />);
        const headRecord = screen.getByText(/Operator/i);
        expect(headRecord).toBeInTheDocument();
        const firstRecord = screen.getByText(/Celcom Axiata/i);
        expect(firstRecord).toBeInTheDocument();
        const secondRecord = screen.getByText(/DiGi Telecom/i);
        expect(secondRecord).toBeInTheDocument();
        const thirdRecord = screen.getByText(/Maxis/i);
        expect(thirdRecord).toBeInTheDocument();
    });

});