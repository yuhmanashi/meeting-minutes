import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import GenericChart from '../Chart';

export default function Test() {
    return (
        <Box>
            <Container sx={{ width: 500, height: 500 }}>
                <GenericChart />
            </Container>
        </Box>
    )
}