import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import GenericList from '../CommonComponents/List';
import GenericMenu from '../CommonComponents/Menu';

import * as pinsActions from '../../store/pins';

import UpdatePinModal from './UpdatePinModal';

export default function Pin({ pin }) {
    const {id, title, body, createdAt} = pin;
    const dispatch = useAppDispatch();

    function handleDelete(id){
        return dispatch(pinsActions.deletePin(id))
    }

    const pinModals = () => {
        return [
            <UpdatePinModal pin={pin}/>,
            <Button onClick={() => {handleDelete(id)}}>
                Delete
            </Button>
        ]
    };

    return (
        // <Box sx={{ m: {xs: 1}, width: {sm: '45%', md: '95%', backgroundColor: 'yellow'} }}>
        //     <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        //         <Typography sx={{ typography: 'h6', px: 2 }}>
        //             {title}
        //         </Typography>
        //         <GenericMenu props={pinModals()}/>
        //     </Box>
        //     <Divider/>
        //     <List sx={{py: {xs: 0}}}>
        //         <ListItem sx={{display: 'flex', flexDirection: 'column', py: {xs: 0}}}>
        //             <ListItemText sx={{alignSelf: 'flex-start', px: 1}}>
        //                 {body}
        //             </ListItemText>
        //             <ListItemText sx={{alignSelf: 'flex-end'}}>
        //                 {`${createdAt.slice(5, 10)}-${createdAt.slice(2, 4)}`}
        //             </ListItemText>
        //         </ListItem>
        //     </List>
        // </Box>
        <Card sx={{ m: {xs: 1}, width: {sm: '45%', md: '95%'}, backgroundColor: 'lightyellow' }}>
            <CardHeader
                action={<GenericMenu props={pinModals()}/>}
                title={title}
                subheader={new Date(createdAt).toLocaleDateString()}
                subheaderTypographyProps={{variant: 'subtitle2'}}
            />
            <CardContent >
                <Typography>
                    {body}
                </Typography>
            </CardContent>
        </Card>
    )
}