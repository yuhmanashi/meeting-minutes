import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import GenericChart from '../CommonComponents/Chart';

const sampleData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
];

const data2 = {
    labels: sampleData.map((data) => data.year), 
    datasets: [{
        label: "Users Gained ",
        data: sampleData.map((data) => data.userGain),
        backgroundColor: [
        "rgba(75,192,192,1)",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
    }]
}

export default function Test() {
    return (
        <Box sx={{}}>
            <Box sx={{height: 300, width: 600}}>
                <GenericChart data={data2} type={'bar'}/>
            </Box>
            <Box sx={{height: 300, width: 600}}>
                <GenericChart data={data2} type={'line'}/>
            </Box>
            <Box sx={{height: 600, width: 600}}>
                <GenericChart data={data2} type={'pie'}/>
            </Box>
            <Box sx={{height: 600, width: 600}}>
                <GenericChart data={data2} type={'donut'}/>
            </Box>
        </Box>
    )
}