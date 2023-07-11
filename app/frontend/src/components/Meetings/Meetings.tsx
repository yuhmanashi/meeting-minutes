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
    meetings: Meeting[]
    user: User
}

function Meetings({ meetings, user }: IMeetings){
  const userMeetings = Object.values(meetings).filter((meeting: Meeting) => meeting.userId === user.id)

    return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table" sx={{maxHeight: 1/5, overflowY: 'scroll'}}>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Problems</TableCell>
                <TableCell align="center">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userMeetings.map((meeting) => (
                <TableRow
                  key={meeting.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {meeting.email}
                  </TableCell>
                  <TableCell align="center">{meeting.name}</TableCell>
                  <TableCell align="center">{meeting.category}</TableCell>
                  <TableCell align="center">{meeting.problems}</TableCell>
                  <TableCell align="center">{meeting.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default Meetings;