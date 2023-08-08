import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Pin from './Pin';

export default function Pins({ pins, students }){
    function handlePin(){
        const tags = {};
        
        for (let pin of pins){
            const tag = pin.tag;
            if (!tags[tag]) tags[tag] = [];
            tags[tag].push(pin);
        }
        
        const res = []
        const keys = Object.keys(tags);
        const values = Object.values(tags);
        
        const Pin = values.map((value) => {
            return value.map((pin) => {
                return [students[pin.studentId].fullName, pin.id]
            })
        })

        // const studentNames = values.map(value => students[value.studentId].fullName);

        for (let i = 0; i < keys.length; i++){
            res[i] = [keys[i], pin[i]]
        }

        
        return res
    }
    
    const pinItems = handlePin()

    return (
        <Container sx={{minHeight: {xs: 320}, maxHeight: {xs: 260, md: 380 }, display: {sm: 'flex', md: 'block' }, flexWrap: 'wrap', overflowX: 'hidden', overflowY: 'auto', }}>
            {pinItems.map((item) => {
                return <Pin key={item} item={item} />
            })}
        </Container>
    )
};