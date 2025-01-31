import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReusableTable  = ({ headers, rows, rowRenderer }) => {
  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto',}}>
      <Table >
        <TableHead>
          <TableRow className="bg-yellow-200 my-7">
            {headers?.map((header, index) => (
              <TableCell
                key={index}
                className="font-bold text-white"
                sx={{ textAlign: 'center', borderBottom: '8px solid white' }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="bg-gray-200">
              {rowRenderer(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable ;