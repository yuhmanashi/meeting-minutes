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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

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
                <TableCell padding='none'>
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
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            {/* <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding='none'>Category</TableCell>
                                        <TableCell padding='none'>Problems</TableCell>
                                        <TableCell padding='none'>Notes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell sx={{px: {xs: 1/10}}}>{meeting.category}</TableCell>
                                    <TableCell sx={{px: {xs: 1/10}}}>{meeting.problems}</TableCell>
                                    <TableCell sx={{px: {xs: 1/10}}}>{meeting.notes}</TableCell>
                                    <TableCell sx={{px: {xs: 1/10}, display: 'flex'}}>
                                        <UpdateMeetingModal meeting={meeting}/>
                                        <Button onClick={handleDelete}>Delete</Button>
                                    </TableCell>
                                </TableBody>
                            </Table> */}
                            {/* <Box>
                                <Typography>
                                    Category
                                </Typography>
                                <Box>

                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <UpdateMeetingModal meeting={meeting}/>
                                <Button onClick={handleDelete}>Delete</Button>
                            </Box> */}
                            <List sx={{py: 0}}>
                                <ListItem sx={{py: 0}}>
                                    <ListItemText primaryTypographyProps={{variant: 'subtitle2'}}>
                                        Category
                                    </ListItemText>
                                    <ListItemText primaryTypographyProps={{variant: 'body2'}}>
                                        {meeting.category}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                                <ListItem sx={{py: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <ListItemText primaryTypographyProps={{variant: 'subtitle2'}}>
                                        Problems
                                    </ListItemText>
                                    <ListItemText primaryTypographyProps={{variant: 'body2'}}>
                                        {meeting.problems}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                                <ListItem sx={{py: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <ListItemText primaryTypographyProps={{variant: 'subtitle2'}}>
                                        Notes
                                    </ListItemText>
                                    <ListItemText primaryTypographyProps={{variant: 'body2'}}>
                                        {meeting.notes}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                                <ListItem sx={{py: 0}}>
                                    <UpdateMeetingModal meeting={meeting}/>
                                    <Button size="small" onClick={handleDelete}>Delete</Button>
                                </ListItem>
                            </List>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}