import React, { useState } from 'react';
import './Splash.css';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function Splash(){
    return (
        <div id='splash'>
            <h1>Welcome to MeetingMinutes</h1>
            
            <div>
                <LoginModal />
                <SignupModal />
            </div>
        </div>
    )
}

export default Splash;