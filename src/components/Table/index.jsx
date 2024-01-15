import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ columns, data , onRowClick}) {
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
    onRowClick(data[index]); // Passez l'objet de données à la fonction parent
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
                <StyledTableCell key={column} align={index === 0 ? "left" : "right"}>
                {column}
                </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index} onClick={() => handleRowClick(index)}>
                {columns.map((column, columnIndex) => (
                    <StyledTableCell key={column} align={columnIndex === 0 ? "left" : "right"}>
                    {row[column.toLowerCase()]}
                    </StyledTableCell>
                ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
