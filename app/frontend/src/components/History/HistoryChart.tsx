import React, { useEffect, useState } from 'react';

import LineChart from '../CommonComponents/Chart/Charts/LineChart';

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

function createThisWeekCount(dates, selectedDay){
    const count = {};
    
    const dateStrings = dates.map(date => {
        const dateString = toLocaleDateString(date).split('/').slice(0, 2).join('/')
        return dateString;
    });

    const today = selectedDay ? selectedDay : new Date();

    const day = today.getDay(); //0-6
    const monthDay = today.getDate();//1-31
    const month = today.getMonth();//0-11

    let max = monthDay + (6 - day);
    let min = monthDay - day;
    let maxMonth = month;
    let minMonth = month;

    if (max > days[month]){
        maxMonth += 1;
        max = max - days[month];
    }

    if (min < 1){
        minMonth -= 1;
        min = days[minMonth] + min;
    }

    let i = 0;
    let currDay = min;
    let currMonth = minMonth;
    
    while (i <= 6){
        if (currDay > days[currMonth]) {
            currDay = 1; 
            currMonth += 1;
        }

        const date = `${currMonth + 1}/${currDay}`
        count[date] = 0;

        currDay++;
        i++;
    }

    for (let date of dateStrings){
      count[date] += 1;
    }

    return count;
}

function createYearCount(dates){
    const count = {};
    for (let i = 0; i <= 11; i++){
        const month = monthes[i]
        count[month] = 0;
    }

    const filtered = dates.map(date => toDateString(date).split(' ')[1]);
    for (let date of filtered){
        count[date] += 1;
    }

    return count;
}

function createAllCount(dates, user){
    const startDate = new Date(user.createdAt)
    const startYr = startDate.getFullYear();
    const startMo = startDate.getMonth();
    const endDate = new Date(dates[dates.length - 1]);
    const endYr = endDate.getFullYear();
    const endMo = endDate.getMonth() + 1;

    const count = {}

    let currMo = startMo;
    let currYr = startYr;

    while (currMo !== endMo || currYr !== endYr){
        if (currMo > 11){
            currMo = 0;
            currYr += 1;
        }
        const date = `${currMo + 1}-${currYr}`
        count[date] = 0;
        currMo += 1;
    }

    const filtered = dates.map(date => new Date(date))
    for (let data of filtered){
        const mo = data.getMonth();
        const yr = data.getFullYear();
        const date = `${mo + 1}-${yr}`;
        count[date] += 1;
    }

    return count;
}

function createData(obj){

    return ({
        labels: Object.keys(obj),
        datasets: [{
            label: '# meetings',
            data: Object.values(obj),
            borderColor: "black",
            tension: .1
        }]
    })
}

function getMax(count){
    const values: number[] = Object.values(count)
    let max = Math.ceil(Math.max(...values) * 1.5)
    return max % 2 === 0 ? max : max + 1;
}

export default function HistoryChart({meetings, selected, user, selectedDay = null}){
    const dates = meetings.map(meeting => meeting.date);
    const [count, setCount] = useState(handleCount(dates))
    const [data, setData] = useState(createData(count));
    const [max, setMax] = useState(getMax(count));

    function handleCount(dates){
        switch(selected) {
          case 'Week':
            return createThisWeekCount(filterDates(dates, byThisWeek), selectedDay)
          case 'Month':
            return createMonthCount(filterDates(dates, byThisMonth))
          case 'Year':
            return createYearCount(filterDates(dates, byThisYear))
          case 'All':
            return createAllCount(dates.map(toDate).sort(sortDate), user)
          default: 
            return createThisWeekCount(filterDates(dates, byThisWeek), selectedDay)
        }
    }

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
        let currCount = handleCount(dates)
        setCount(currCount);
        setData(createData(currCount));
        setMax(getMax(currCount));
    }, [meetings, selected]);

    return (
        <LineChart chartData={data} title={''} max={max}/>
    )
}