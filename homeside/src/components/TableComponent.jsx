import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2B3467',
    color: theme.palette.common.white,
    textAlign: 'center', // Center align content in table head
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center', // Center align content in table body
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '150px', // Set a maximum width to limit the displayed text length
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ Data }) {

  const columns = [];

  const handleMouseEnter = (event, content) => {
    event.target.title = content;
  };

  const handleMouseLeave = (event) => {
    event.target.title = '';
  };

  for (const key in Data[0]) {
    columns.push(key); // "a", "b", "c"
  }

  return (
    <TableContainer component={Paper} sx={{marginTop:2}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((row) => (
            <StyledTableRow key={row._id}>
              {columns.map((column) => (
                <StyledTableCell
                  key={column}
                  onMouseEnter={(event) => handleMouseEnter(event, row[column])}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row[column].length > 15
                      ? row[column].substring(0, 15) + '...' // Show only 15 characters with ellipsis
                      : row[column]}
                  </div>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
CustomizedTables.propTypes = {
    Data: PropTypes.arrayOf(
      PropTypes.shape({
        // Define the shape of each object in the array
        // Adjust the prop types according to your actual object structure
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        // Add more prop types for other properties
      })
    ).isRequired,
  };
  