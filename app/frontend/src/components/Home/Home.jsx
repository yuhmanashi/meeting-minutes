import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';

import Meetings from '../Meetings/Meetings';

function Home(){
    return (
        <div id='home'>
            <h1>Home</h1>
            <Meetings />
        </div>
    )
}

export default Home;