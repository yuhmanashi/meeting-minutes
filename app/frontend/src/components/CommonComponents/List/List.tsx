import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface ListProps {
    items: string[] | number[];
    label: string | number;
}

export default function GenericList({ items, label }: ListProps){
    return (
        <Box>
            <Typography>
                {label}
            </Typography>
            <List>
                {items.map((item) => {
                    return (
                        <ListItem key={item}>
                            <ListItemText>
                                {item}
                            </ListItemText>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}