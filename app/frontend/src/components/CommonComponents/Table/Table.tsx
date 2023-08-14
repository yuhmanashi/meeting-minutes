//React
import * as React from 'react';

//MUI
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

//Components
import GenericTableRow from './TableRow';

//Sorting Functions
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>( order: Order, orderBy: Key): (
  a: { [key in Key]: string | number },
  b: { [key in Key]: string | number },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// TableHead
interface GenericHeadCell {
  label: string;
  id: string;
}

interface GenericTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  order: Order;
  orderBy: keyof any;
  rowCount: number;
  values: GenericHeadCell[];
  buttons: any;
}

function GenericTableHead(props: GenericTableHeadProps){
  const { order, orderBy, onRequestSort, values, buttons } = props;
  const createSortHandler =
    (property: keyof any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {values.map((value: GenericHeadCell) => (
          <TableCell
            key={value.id}
            colSpan={6}
            sortDirection={orderBy === value.id ? order : false}
            sx={{width: '100%'}}
          >
            <TableSortLabel
              active={orderBy === value.id}
              direction={orderBy === value.id ? order : 'asc'}
              onClick={createSortHandler(value.id)}
            >
              {value.label}
              {orderBy === value.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key='button' sx={ buttons ? { display: 'block'} : { display: 'none' } }>
          <Box sx={{height: {xs: 25, md: 25.5}}}/>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface GenericTableProps {
  list: any;
  values: GenericHeadCell[];
  rValues: GenericHeadCell[];
  details: any;
  buttons: any;
  page: number;
  setPage: any;
}

export default function GenericTable({list, values, rValues, details, buttons, page, setPage}: GenericTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof any>(values[0].id);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = list.slice().sort(getComparator(order, orderBy))

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visibleRows.length) : 0;

  // const visibleRows1 = React.useMemo(
  //   () =>
  //     sorted.slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     ),
  //   [order, orderBy, page, rowsPerPage],
  // );

  function getRowValues(values) {
    return values.map(value => value.id)
  }

  return (
    <Box sx={{}}>
      <Paper sx={{  mb: 2 }}>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <GenericTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
              values={values}
              buttons={buttons}
            />
            <TableBody>
              {(rowsPerPage > 0 
                ? visibleRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : visibleRows
              ).map((row) => (
                <GenericTableRow key={row.id} row={row} values={getRowValues(values)} details={details} buttons={buttons}/>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell/>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Table
            aria-labelledby="tableTitle"
            size={'small'}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <GenericTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
              values={rValues}
              buttons={buttons}
            />
            <TableBody>
              {(rowsPerPage > 0 
                ? visibleRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : visibleRows
              ).map((row) => (
                <GenericTableRow key={`r${row.id}`} row={row} values={getRowValues(rValues)} details={details} buttons={buttons}/>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={visibleRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows"
        />
      </Paper>
    </Box>
  );
}