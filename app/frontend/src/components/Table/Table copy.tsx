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

interface GenericTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  order: Order;
  orderBy: keyof any;
  rowCount: number;
  values: GenericHeadCell[];
}

function GenericTableHead(props: GenericTableHeadProps){
  const { order, orderBy, onRequestSort, values } = props;
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
            padding='none'
            sortDirection={orderBy === value.id ? order : false}
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
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

interface GenericTableProps {
  list: any;
  values: GenericHeadCell[];
  details: any;
  buttons: any;
}

export default function GenericTable({list, values, details, buttons}: GenericTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof any>(values[0].id);
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
  
  const rowValues = values.map(value => {
    return value.id
  })

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
              values={values}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <GenericTableRow key={row.id} row={row} values={rowValues} details={details} buttons={buttons}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}