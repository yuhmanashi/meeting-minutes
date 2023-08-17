import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';

export default function Footer(){
    return (
        <Box>
            {/* <Divider/> */}
            <Container 
                sx={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    minHeight: 40,
                    p: 4,
                }}
            >
                <Box sx={{ display: {xs:'block', sm: 'flex'} }}>
                    <Box sx={{ display: 'flex' }}>
                        <Link
                            href='https://github.com/yuhmanashi/meeting-minutes' 
                            underline='none' 
                            target="_blank" 
                            rel="noopener"
                        >
                            <IconButton 
                                sx={{p: 0}}
                            >
                                <AccessTimeFilledIcon fontSize='large'/>
                            </IconButton>
                        </Link>
                        <Typography 
                            variant='h6'
                            fontFamily="'Bricolage Grotesque', sans-serif"
                            sx={{
                                mx: 1
                            }}
                        >
                            MeetingMinutes
                        </Typography>
                    </Box>
                    <Typography
                        variant='caption'
                        color='grey'
                        sx={{
                            m: 1,
                        }}
                    >
                        Copyright © 2023 Yao Xu
                    </Typography>
                </Box>

                <Box sx={{display: 'flex'}}>
                    <Link
                        href='https://yaozxu.com' 
                        underline='none' 
                        target="_blank" 
                        rel="noopener"
                    >
                        <IconButton>
                            <PersonIcon/>
                        </IconButton>
                    </Link>
                    <Link
                        href='https://github.com/yuhmanashi' 
                        underline='none' 
                        target="_blank" 
                        rel="noopener"
                    >
                        <IconButton>
                            <GitHubIcon/>
                        </IconButton>
                    </Link>
                    <Link
                        href='https://linkedin.com/in/yaoxu03' 
                        underline='none' 
                        target="_blank" 
                        rel="noopener"
                    >
                        <IconButton>
                            <LinkedInIcon/>
                        </IconButton>
                    </Link>
                </Box>
            </Container>
        </Box>
    )
}