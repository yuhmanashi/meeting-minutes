import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import GenericChart from '../Chart';

export default function Test() {
    return (
        <Box sx={{}}>
            <Box sx={{height: 300, width: 600}}>
                <GenericChart type={'bar'}/>
            </Box>
            <Box sx={{height: 300, width: 600}}>
                <GenericChart type={'line'}/>
            </Box>
            <Box sx={{height: 600, width: 600}}>
                <GenericChart type={'pie'}/>
            </Box>
            <Box sx={{height: 600, width: 600}}>
                <GenericChart type={'donut'}/>
            </Box>
        </Box>
    )
}