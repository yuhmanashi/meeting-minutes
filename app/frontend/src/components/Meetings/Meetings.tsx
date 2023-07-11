import React, { useState } from 'react';
import * as meetingsActions from '../../store/meetings';
import { useAppDispatch } from '../../utils/hooks';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Meeting from './Meeting';

type IMeetings = {
    meetings: Meeting[]
    user: User
}

function Meetings({ meetings, user }: IMeetings){
  const userMeetings = Object.values(meetings).filter((meeting: Meeting) => meeting.userId === user.id)
  const dispatch = useAppDispatch();

  if (!meetings) return null;

  function handleEdit(){
    
  }

  function handleDelete(){
    
  }

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
                <Meeting id={meeting.id} meeting={meeting}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default Meetings;