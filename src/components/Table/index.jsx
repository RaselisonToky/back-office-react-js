import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress'; // Importez le composant CircularProgress

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

export default function CustomizedTables({ columns, data, onRowClick }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true); // Nouvel état pour indiquer le chargement
  const rowsPerPage = 10;

  React.useEffect(() => {
    // Simulez un délai de chargement avec setTimeout
    setTimeout(() => {
      setLoading(false); // Mettez à jour l'état pour indiquer que le chargement est terminé
    }, 2000); // Temps de chargement simulé (2 secondes)
  }, []); // Exécutez cet effet uniquement lors du montage initial

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (index) => {
    const dataIndex = (page - 1) * rowsPerPage + index;
    setSelectedRow(dataIndex);
    onRowClick(data[dataIndex]);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <div>
      {loading ? (
        <CircularProgress sx={{ alignSelf: 'center', marginTop: 2 }} /> // Affichez le spinner de chargement
      ) : (
        <>
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
                {displayedData.map((row, index) => (
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
          <Pagination
            color="primary"
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            sx={{ marginTop: 2, alignSelf: 'center' }}
          />
        </>
      )}
    </div>
  );
}
