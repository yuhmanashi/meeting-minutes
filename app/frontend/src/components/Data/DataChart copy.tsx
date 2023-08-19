import React, { useEffect, useState } from 'react';

import LineChart from '../CommonComponents/Chart/Charts/LineChart';
import BarChart from '../CommonComponents/Chart/Charts/BarChart';
import DonutChart from '../CommonComponents/Chart/Charts/DonutChart';

import Test from './Test';

function toDate(date) {
    if (!date) return new Date();
    return new Date(date);
}

function toDateString(date) {
    return new Date(date).toDateString()
}

function toLocaleDateString(date) {
    return new Date(date).toLocaleDateString()
}

function sortDate(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
}

//filters
function filterDates(dates, callback) {
    const filteredDates = dates.map(toDate).filter(callback);
    return filteredDates;
}

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

/* 3 Monthes */
function by3Monthes(date){
    const currentMonth = new Date().getMonth();
    const month = date.getMonth()
    return month === currentMonth || month === currentMonth - 1 || month === currentMonth + 1;
}

function byDays(date){
    return date.getDate()
}

function byMonthes(date){
    const month = date.getMonth();
    return month
}

function createMonthCount(dates){ 
    const count = {};
    const month = new Date().getMonth();

    for (let i = 1; i <= days[month]; i++){
      count[`${month+1}/${i}`] = 0;
    }

    const filtered = dates.map(date => toLocaleDateString(date).split('/').slice(0, 2).join('/'));
      
    for (let data of filtered){
      count[data] += 1;
    }

    return count;
}

const monthes = [
    'Jan', 
    'Feb', 
    'Mar', 
    'Apr', 
    'May', 
    'Jun', 
    'Jul', 
    'Aug', 
    'Sep', 
    'Oct', 
    'Nov', 
    'Dec'
]

export default function DataChart({meetings, selected, user, selectedDay = null}){
    const test = filterMeetings(meetings, byThisYear);

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

    useEffect(() => {

    }, [meetings, selected]);

    return (

        <LineChart chartData={data} max={max}/>

    )
}