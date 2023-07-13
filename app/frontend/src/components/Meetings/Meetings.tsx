import React, { useState, useEffect } from 'react';
import * as meetingsActions from '../../store/meetings';
import * as studentActions from '../../store/students';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { alpha } from '@mui/material/styles';
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

import MeetingRow from './Meeting';

type IMeetings = {
  meetings: MeetingWithStudent[]
  user: User
}

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

interface HeadCell {
  disablePadding: boolean;
  name: keyof MeetingWithStudent;
  label: string;
}

const headCells: readonly HeadCell[] = [
  // {
  //   name: 'email',
  //   disablePadding: true,
  //   label: 'Email',
  // },
  // {
  //   name: 'name',
  //   disablePadding: true,
  //   label: 'Name',
  // },
   {
    name: 'studentName',
    disablePadding: true,
    label: 'Name',
  },
   {
    name: 'studentEmail',
    disablePadding: true,
    label: 'Email',
  },
  {
    name: 'category',
    disablePadding: true,
    label: 'Category',
  },
  // {
  //   name: 'problems',
  //   disablePadding: false,
  //   label: 'Problems',
  // },
  // {
  //   name: 'notes',
  //   disablePadding: false,
  //   label: 'Notes',
  // },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MeetingWithStudent) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof MeetingWithStudent) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.name}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.name ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.name}
              direction={orderBy === headCell.name ? order : 'asc'}
              onClick={createSortHandler(headCell.name)}
            >
              {headCell.label}
              {orderBy === headCell.name ? (
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

export default function EnhancedTable({ meetings, user }: IMeetings) {
  const userMeetings = Object.values(meetings).filter((meeting: MeetingWithStudent) => meeting.userId === user.id)
  const dispatch = useAppDispatch();
  const students = useAppSelector(state => state.students)

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof MeetingWithStudent>('category');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    dispatch(studentActions.fetchStudents())
  }, [dispatch])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof MeetingWithStudent,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const updatedMeetings = userMeetings.map(meeting => {
    const student = students[meeting.studentId];
    meeting['studentName'] = `${student.firstName} ${student.lastName}`;
    meeting['studentEmail'] = student.email;
    return meeting;
  })

  const visibleRows = updatedMeetings.slice().sort(getComparator(order, orderBy))
  
  if (!updatedMeetings || !visibleRows) return null;

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
              rowCount={userMeetings.length}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <MeetingRow meeting={row}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}