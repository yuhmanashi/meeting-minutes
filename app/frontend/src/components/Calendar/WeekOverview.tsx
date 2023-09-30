import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import { Typography, Divider } from '@mui/material';

export default function WeekOverview(){
    return (
        <Box sx={{
            display: {
                xs: 'none', 
                sm: 'block'
            },
            width: 320, 
            border: 1, 
            borderColor: 'lightgray',
            py: 1
        }}>
            <Typography variant='h6' sx={{ px: 2, pb: 1, fontWeight:'bold' }}>
                Weekly Overview
            </Typography>
            <Divider variant='fullWidth' />
            <Box 
                sx={{ 
                    p: 2 
                }}
            >
                <Box>
                    Monday
                </Box>
                <Box>
                    Tuesday
                </Box>
                <Box>
                    Wednesday
                </Box>
                <Box>
                    Thursday
                </Box>
                <Box>
                    Friday
                </Box>
                <Box>
                    Saturday
                </Box>
                <Box>
                    Sunday
                </Box>
            </Box>
        </Box>
    )
}