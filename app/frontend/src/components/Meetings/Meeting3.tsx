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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import UpdateMeetingModal from './UpdateMeetingModal';

type IMeeting = {
    meeting: Meeting
}

export default function Meeting({ meeting }: IMeeting){
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    function handleDelete(e) {
        e.preventDefault();
        return dispatch(meetingsActions.deleteMeeting(meeting.id))
    }

    if (!meeting) return null;

    return (
        <>
            <TableRow
                key={meeting.id}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" sx={{px: {xs: 1/10}}}>{meeting.email}</TableCell>
                <TableCell sx={{px: {xs: 1/10}}}>{meeting.name}</TableCell>
                {/* <TableCell align="center">{meeting.category}</TableCell>
                <TableCell align="center">{meeting.problems}</TableCell>
                <TableCell align="center">{meeting.notes}</TableCell>
                <TableCell>
                    <UpdateMeetingModal meeting={meeting}/>
                    <Button onClick={handleDelete}>Delete</Button>
                </TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <TableCell align="center">{meeting.category}</TableCell>
                    <TableCell align="center">{meeting.problems}</TableCell>
                    <TableCell align="center">{meeting.notes}</TableCell>
                    <TableCell>
                        <UpdateMeetingModal meeting={meeting}/>
                        <Button onClick={handleDelete}>Delete</Button>
                    </TableCell>
                </Collapse>
                </TableCell>
            </TableRow>
            {/* <TableRow
                open={open}
            >
                <TableCell align="center">{meeting.category}</TableCell>
                <TableCell align="center">{meeting.problems}</TableCell>
                <TableCell align="center">{meeting.notes}</TableCell>
                <TableCell>
                    <UpdateMeetingModal meeting={meeting}/>
                    <Button onClick={handleDelete}>Delete</Button>
                </TableCell>
            </TableRow> */}
        </>
    );
}