import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import type { RootState, AppDispatch } from '../../store';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';
import Button from '@mui/material/Button';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';
import * as watchlistActions from '../../store/watchlists';

import CreateMeetingModal from '../Meetings/CreateMeetingModal';
import CreateWatchlistModal from '../Watchlists/Modal';
import GenericChart from '../CommonComponents/Chart';
import Watchlists from '../Watchlists';

const pinks = [
    "#FFC0CB",
    "#FFB6C1",
    "#FF69B4",
    "#FF1493",
    "#DB7093",
    "#C71585"
]

const purples = [
    "#D8BFD8",
    "#DDA0DD",
    "#DA70D6",
    "#EE82EE",
    "#FF00FF",
    "#BA55D3",
    "#9932CC",
    "#9400D3"
]

const blues = [
    "#00FFFF",
    "#AFEEEE",
    "#7FFFD4",
    "#40E0D0",
    "#48D1CC",
    "#00CED1",
    "#ADD8E6",
    "#B0E0E6",
    "#87CEFA",
    "#87CEEB"
]

const reds = [
    "#FFA07A",
    "#FA8072",
    "#E9967A",
    "#F08080",
    "#CD5C5C",
    "#DC143C"
]

const greens = [
    "#ADFF2F",
    "#7FFF00",
    "#7CFC00",
    "#00FF00",
    "#32CD32",
    "#98FB98",
    "#90EE90",
    "#00FA9A",
    "#00FF7F"
]

function Home(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionMeetings = useAppSelector((state) => state.meetings);
    const sessionStudents = useAppSelector((state) => state.students);
    const sessionWatchlists = useAppSelector(state => state.watchlists);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(meetingActions.fetchMeetings());
        dispatch(studentActions.fetchStudents());
        dispatch(watchlistActions.fetchWatchlists());
    }, [dispatch])

    if (Object.keys(sessionMeetings).length < 1 || Object.keys(sessionStudents).length < 1 || Object.keys(sessionWatchlists).length < 1) return null;

    //data for graph
    function userFilter(obj){
        const userId = sessionUser.id
        return Object.values(obj).filter((value: any) => value.userId === userId)
    }

    function createData(obj, color, title = 'count'){
        return ({
            labels: Object.keys(obj),
            datasets: [{
                label: title,
                data: Object.values(obj),
                backgroundColor: color,
                borderColor: "black",
                borderWidth: 2
            }]
        })
    }

    //how many times a student has had a meeting w u
    function getCount(obj, callback){ 
        const count = {};
        const filtered = obj.map(callback);
        
        for (let data of filtered){
            if (!count[data]) count[data] = 0;
            count[data] += 1;
        }

        return count;
    }
    //how many times a category shows up
    const userMeetings = userFilter(sessionMeetings);

    const categoryCount = getCount(userMeetings, value => value.category);
    const categoriesData = createData(categoryCount, greens);
 
    const studentsCount = getCount(userMeetings, value => sessionStudents[value.studentId].fullName);
    const studentsData = createData(studentsCount, blues, '#meetings');

    // const timeData = {
    //     labels: Object.keys(categoryCount),
    //     datasets: [{
    //         label: 'Category',
    //         data: Object.values(categoryCount),
    //         backgroundColor: [
    //             "rgba(75,192,192,1)",
    //             "#50AF95",
    //             "#f3ba2f",
    //             "#2a71d0"
    //         ],
    //         borderColor: "black",
    //         borderWidth: 2
    //     }]
    // }

    const userWatchlists = Object.values(sessionWatchlists).filter((watchlist: Watchlist) => watchlist.userId === sessionUser.id)

    return (
        <Box>
            <Container sx={{ /*display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'*/}}>
                <Typography sx={{typography: 'h4', my: 2}}>
                    Dashboard
                </Typography>
                <Container sx={{ my: 1, maxWidth: {xs: 300, sm: 500, md: 700}, display: {md:'flex', lg: 'flex'}, mx: {md: 0, lg: 0}, justifyContent: 'center' }}>
                    <Container sx={{ p: 1, display: {xs: 'block', sm:'none', md: 'none', lg: 'none'} }}>
                        <GenericChart data={categoriesData} type={'donut'} title={'categories frequency'} ratio={1} />
                    </Container>
                    <Container sx={{ p: 1, display: {xs: 'none', sm:'block', md: 'block', lg: 'block'} }}>
                        <GenericChart data={categoriesData} type={'donut'} title={'categories frequency'}/>
                    </Container>
                    <Container sx={{ p: 1, display: {xs: 'none', sm:'block', md: 'block', lg: 'block'} }}>
                        <GenericChart data={studentsData} type={'bar'} title={'#meetings w/ students'}/>
                    </Container>
                    {/* <Typography sx={{typography: 'h5', p: 2}}>
                        Charts
                    </Typography> */}
                    {/* <Container sx={{ my: 1 }}>
                        <Container sx={{ p: 0, display: {xs: 'block', md: 'none'} }}>
                            <GenericChart data={categoriesData} type={'donut'} title={'categories frequency'} ratio={1} />
                        </Container>
                        <Container sx={{ p: 0, display: {xs: 'none', md: 'block'} }}>
                            <GenericChart data={categoriesData} type={'donut'} title={'categories frequency'}/>
                        </Container>
                        <Container sx={{ p: 0, display: {xs: 'none', md: 'block'} }}>
                            <GenericChart data={studentsData} type={'bar'} title={'#meetings w/ students'}/>
                        </Container>
                    </Container> */}
                    {/* <GenericChart data={data} type={'donut'} /> */}
                </Container>
                <Box sx={{display: { xs:'block', md:'flex' }}}>
                    <Container sx={{ maxWidth: {xs: 600, md: 330}, minWidth: {xs: 320, md: 280, lg: 340}, maxHeight: {xs: 320, md: 490.48}, p: {xs: 0}, border: 1, my: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography sx={{typography: 'h5', px: 2}}>
                                Watchlists
                            </Typography>
                            <CreateWatchlistModal watchlists={userWatchlists} students={sessionStudents} />
                        </Box>
                        <Watchlists watchlists={userWatchlists} students={sessionStudents}/>
                    </Container>
                    <Container sx={{ maxWidth: {xs: 600, md: 650, lg: 700}, minWidth: 320, p: {xs: 0}, border: 1, my: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography sx={{typography: 'h5', px: 2}}>
                                Meetings
                            </Typography>
                            <CreateMeetingModal />
                        </Box>
                        <Meetings meetings={sessionMeetings} user={sessionUser} students={sessionStudents}/>
                    </Container>
                </Box>
            </Container>
        </Box>
    )
}

export default Home;