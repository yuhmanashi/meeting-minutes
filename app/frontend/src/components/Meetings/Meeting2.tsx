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

import UpdateMeetingModal from './UpdateMeetingModal';

type IMeeting = {
    meeting: Meeting
}

export default function Meeting({ meeting }: IMeeting){
    const dispatch = useAppDispatch();

    function handleDelete(e) {
        e.preventDefault();
        return dispatch(meetingsActions.deleteMeeting(meeting.id))
    }

    if (!meeting) return null;

    return (
        <TableRow
          tabIndex={-1}
          key={meeting.id}
        >
            <TableCell component="th" scope="row">
                {meeting.email}
            </TableCell>
            <TableCell align="center">{meeting.name}</TableCell>
            <TableCell align="center">{meeting.category}</TableCell>
            <TableCell align="center">{meeting.problems}</TableCell>
            <TableCell align="center">{meeting.notes}</TableCell>
            <TableCell>
                <UpdateMeetingModal meeting={meeting}/>
                <Button onClick={handleDelete}>Delete</Button>
            </TableCell>
        </TableRow>
    );
}