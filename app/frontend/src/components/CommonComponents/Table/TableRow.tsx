//React
import React, { useEffect, useState } from 'react';

//MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
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
import { styled } from "@mui/material/styles";
import GenericMenu from '../Menu';

//TableRow Interface
interface GenericTableRowProps{
    row: {};
}

export default function GenericTableRow(props){
    const { row, values, details, buttons } = props
    const [open, setOpen] = useState(false);
    const collapse = details.length !== 0;
    const rowButtons = buttons.length > 0 ? buttons(row) : null;
    const TableCell = styled(MuiTableCell)`
        :last-of-type {
            width: 100;
            max-width: 100;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `;
        
    return (
        <React.Fragment>
            <TableRow>
                {/* <TableCell sx={{width: '100%'}} colSpan={6}>
                    {row[values[0]]}
                </TableCell> */}
                {values.map(value => {
                    return (
                        <TableCell key={row[value]} sx={{width: '100%'}} colSpan={6}>{row[value]}</TableCell> 
                    )
                })}
                <TableCell sx={ buttons ? { display: 'block', height: {sm: 74, md: 74} } : { display: 'none' } }>
                    <GenericMenu props={buttons(row)}/>
                </TableCell>
                <TableCell sx={ collapse ? { display: 'block' } : { display: 'none' } } >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
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
                                {details.map(detail => {
                                    return (
                                        <ListItem key={detail.id} sx={{py: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                            <ListItemText primaryTypographyProps={{variant: 'subtitle2'}}>
                                                {detail.label}
                                            </ListItemText>
                                            <ListItemText primaryTypographyProps={{variant: 'body2'}}>
                                                {detail.id}
                                            </ListItemText>
                                        </ListItem>
                                    )
                                })}
                                <Divider/>
                                <ListItem sx={{py: 0}}>
                                    {rowButtons}
                                </ListItem>
                            </List>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}