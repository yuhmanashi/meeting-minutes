import React, { useEffect, useState } from 'react';

import BarChart from '../CommonComponents/Chart/Charts/BarChart';

function toDate(date) {
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
    const currentYear = new Date().getYear();
    return date.getYear() === currentYear
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
    const startYr = startDate.getYear() - 100;
    const startMo = startDate.getMonth();
    const endDate = new Date(dates[dates.length - 1]);
    const endYr = endDate.getYear() - 100;
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
        const yr = data.getYear() - 100;
        const date = `${mo + 1}-${yr}`;
        count[date] += 1;
    }

    return count;
}

function createData(obj){

    return ({
        labels: Object.keys(obj),
        datasets: [{
            label: '#meetings',
            data: Object.values(obj),
            backgroundColor: [
                '#F8B195', 
                '#F67280', 
                '#CO6C84', 
                '#6C5B7B', 
                '#355C7D', 
                '#A8E6CE', 
                '#DCEDC2', 
                '#FFD3B5', 
                '#FFAAA6', 
                '#FF8C94' 
            ]
        }]
    })
}

function getMax(count){
    let max = Math.ceil(Math.max(...Object.values(count)) * 1.5)
    return max % 2 === 0 ? max : max + 1;
}

function handleCategoriesCount(categories, meetings){
    const count = {};
    for (let category of categories){
        count[category] = 0;
    }

    for (let meeting of meetings){
        if (meeting.category.length > 0) count[meeting.category] += 1;
    }

    return count;
}

function createCategoriesData(obj){
    return ({
        labels: Object.keys(obj),
        datasets: [{
            label: '#meetings',
            data: Object.values(obj),
            backgroundColor: [
                '#F8B195', 
                '#F67280', 
                '#CO6C84', 
                '#6C5B7B', 
                '#355C7D', 
                '#A8E6CE', 
                '#DCEDC2', 
                '#FFD3B5', 
                '#FFAAA6', 
                '#FF8C94' 
            ]
        }]
    })
}

export default function CategoriesChart({ categories, meetings, selected, user, selectedDay = null}){
    const sortedDates = meetings.map(meeting => meeting.date).sort(sortDate);
    const [count, setCount] = useState(handleCategoriesCount(categories, meetings))
    const [data, setData] = useState(createCategoriesData(count));
    const [max, setMax] = useState(getMax(count));

    function handleCount(dates){
        switch(selected) {
          case 'Week':
            return createCategoriesCount(filterDates(dates, byThisWeek), selectedDay)
          case 'Month':
            return createMonthCount(filterDates(dates, byThisMonth))
          case 'Year':
            return createYearCount(filterDates(dates, byThisYear))
          case 'All':
            return createAllCount(dates.map(toDate), user)
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
        let currCount = handleCategoriesCount(categories, meetings)
        setCount(currCount);
        setData(createCategoriesData(currCount));
        setMax(getMax(currCount));
    }, [meetings, selected]);

    return (
        <BarChart chartData={data} max={max}/>
    )
}