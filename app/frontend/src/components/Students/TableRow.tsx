//React
import React, { useEffect, useState } from 'react';

//MUI
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

//TableRow Interface
interface GenericTableRowProps{
    row: {};
}

export default function GenericTableRow({ row, details }){
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow>
                {details.map(detail => {
                    return (
                        <TableCell sx={{px: {xs: 1/10}}}>{row[detail]}</TableCell>
                    )
                })}
                {/* <TableCell component="th" scope="row" sx={{px: {xs: 1/10}}}>{meeting.studentName}</TableCell>
                <TableCell sx={{px: {xs: 1/10}}}>{meeting.studentEmail}</TableCell>
                <TableCell sx={{px: {xs: 1/10}}}>{meeting.category}</TableCell> */}
                {/* <TableCell align="center">{meeting.category}</TableCell>
                <TableCell align="center">{meeting.problems}</TableCell>
                <TableCell align="center">{meeting.notes}</TableCell>
                <TableCell>
                    <UpdateMeetingModal meeting={meeting}/>
                    <Button onClick={handleDelete}>Delete</Button>
                </TableCell> */}
                <TableCell padding='none'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <List sx={{py: 0}}>
                                {/* <ListItem sx={{py: 0}}>
                                    <ListItemText primaryTypographyProps={{variant: 'subtitle2'}}>
                                        Category
                                    </ListItemText>
                                    <ListItemText primaryTypographyProps={{variant: 'body2'}}>
                                        {meeting.category}
                                    </ListItemText>
                                </ListItem>
                                <Divider/> */}
                                {/* <ListItem sx={{py: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
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
                                </ListItem> */}
                                <Divider/>
                                <ListItem sx={{py: 0}}>
                                    {/* <UpdateMeetingModal meeting={meeting}/>
                                    <Button size="small" onClick={handleDelete}>Delete</Button> */}
                                </ListItem>
                            </List>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}