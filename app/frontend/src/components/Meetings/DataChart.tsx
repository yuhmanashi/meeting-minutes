import React, {useState, useEffect} from 'react';

import CategoriesChart from './CategoriesChart';
import MeetingsChart from './MeetingsChart';

//filters
function filterMeetings(meetings, callback){
    const filteredMeetings = meetings.filter(meeting => callback(new Date(meeting.date)));
    return filteredMeetings;
}

/* This Month */
function byThisMonth(date){
    const currentMonth = new Date().getMonth();
    return date.getMonth() === currentMonth
}
/* This Year */
function byThisYear(date){
    const currentYear = new Date().getFullYear();
    return date.getFullYear() === currentYear
}
/* This Week */
const days = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}

export default function DataChart({meetings, selected, categories, selectedDay = null}){
    const [data, time] = selected;

    function byThisWeek(date){
        const today = selectedDay ? selectedDay : new Date();
        const day = today.getDay();
        const monthDay = today.getDate();
        const month = today.getMonth();
    
        const max = 6 - day;
        let maxDay = monthDay + max;
        let minDay = monthDay - day;
        
        const tDay = date.getDate();
        const tMonth = date.getMonth();
    
        if (tMonth === month && tDay >= minDay && tDay <= maxDay) return true;
    
        if (maxDay > days[month]) return tMonth === month + 1 && tDay <= maxDay - days[month];
    
        if (minDay < 0) return tMonth === month - 1 && tDay >= days[month - 1] + minDay;
    }

    function handleMeetings(){
        switch(time){
            case 'Week':
                return filterMeetings(meetings, byThisWeek);
            case 'Month':
                return filterMeetings(meetings, byThisMonth);
            case 'Year':
                return filterMeetings(meetings, byThisYear);
            case 'All':
                return meetings;
            default:
                return filterMeetings(meetings, byThisWeek);
        }
    }

    switch(data){
        case 'Category':
            return <CategoriesChart meetings={handleMeetings()} time={time} categories={categories} />
        case 'Meeting':
            return <MeetingsChart meetings={handleMeetings()} time={time} />
        default:
            return <MeetingsChart meetings={handleMeetings()} time={time} />
    }
}