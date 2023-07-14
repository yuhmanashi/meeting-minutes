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
interface GenericHeadCell<T>{
  disablePadding: boolean;
  label: string;
  id: keyof T;
}

function getHeadCells<T>(arr: T[]): T {
  return arr.map((detail) => {
    const [label, id] = detail;
    return {
      disablePadding: true,
      label: label,
      id: id
    }
  });
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

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Student) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  arr: [];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Student) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  
  const headCells = getHeadCells(props.arr);
  console.log(headCells);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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

//TableProps Typing
interface GenericTableProps {
  props: {};
}

export default function GenericTable(props: GenericTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Student>('fullName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Student,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const students = Object.values(props.students)
  const visibleRows = students.sort(getComparator(order, orderBy))
  
  console.log(props);

  return (
    <Box sx={{ }}>
      <Paper sx={{  mb: 2 }}>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
              arr={props.details}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <GenericTableRow key={row.id} props={row}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}