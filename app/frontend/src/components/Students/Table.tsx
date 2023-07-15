//React
import React, { useState, useEffect } from 'react';

//MUI
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
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

// interface HeadCell {
//   disablePadding: boolean;
//   label: string;
//   id: keyof Student;
// }

// const headCells: readonly HeadCell[] = [
//   {
//     disablePadding: false,
//     label: 'Name',
//     id: 'fullName',
//   },
//   {
//     disablePadding: false,
//     label: 'Email',
//     id: 'email',
//   }
// ];

interface GenericTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  order: Order;
  orderBy: keyof any;
  rowCount: number;
  details: GenericHeadCell[];
}

function GenericTableHead(props: GenericTableHeadProps){
  const { order, orderBy, onRequestSort, details } = props;
  const createSortHandler =
    (property: keyof any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {details.map((headCell: GenericHeadCell) => (
          <TableCell
            key={headCell.id}
            padding='none'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

interface GenericTableProps {
  list: any;
  details: GenericHeadCell[];
}

export default function GenericTable({list, details}: GenericTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof any>(details[0].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const visibleRows = list.slice().sort(getComparator(order, orderBy))
  const rowDetails = details.map(detail => {return detail.id})
  return (
    <Box sx={{ }}>
      <Paper sx={{  mb: 2 }}>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <GenericTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
              details={details}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <GenericTableRow key={row.id} row={row} details={rowDetails}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}