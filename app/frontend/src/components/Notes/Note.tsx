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

import Divider from '@mui/material/Divider';

import GenericMenu from '../CommonComponents/Menu';

import * as pinsActions from '../../store/pins';

import UpdatePinModal from './UpdateNoteModal';

export default function Pin({ pin }) {
    const {id, title, body, createdAt, color} = pin;
    const dispatch = useAppDispatch();

    function handleDelete(id){
        return dispatch(pinsActions.deletePin(id))
    }

    const pinButtons = () => {
        return [
            <UpdatePinModal pin={pin}/>,
            <Button onClick={() => {handleDelete(id)}}>
                Delete
            </Button>
        ]
    };

    const handleColor = color.length > 1 ? color : '#fbfbde';

    return (
        <Card sx={{ m: 1, backgroundColor: handleColor, maxWidth: 330 }}>
            <CardHeader
                action={<GenericMenu options={pinButtons()} buttonColor='black'/>}
                title={title}
                subheader={new Date(createdAt).toLocaleDateString()}
                subheaderTypographyProps={{variant: 'subtitle2'}}
                sx={{wordBreak: 'break-word'}}
            />
            <Divider variant='fullWidth' />
            <CardContent >
                <Typography>
                    {body}
                </Typography>
            </CardContent>
        </Card>
    )
}