import React, { useState } from 'react';
import * as meetingsActions from '../../store/meetings';
import { useDispatch, useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type IMeetings = {
    meetings: Record<number, Meeting>
}

function Meetings({ meetings }: IMeetings){
    return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Problem</TableCell>
                <TableCell align="center">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(meetings).map((meeting) => (
                <TableRow
                  key={meeting.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {meeting.studentEmail}
                  </TableCell>
                  <TableCell align="center">{meeting.student}</TableCell>
                  <TableCell align="center">{meeting.category}</TableCell>
                  <TableCell align="center">{meeting.problem}</TableCell>
                  <TableCell align="center">{meeting.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default Meetings;