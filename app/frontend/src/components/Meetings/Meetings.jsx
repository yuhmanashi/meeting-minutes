import React, { useState } from 'react';
import * as meetingsActions from '../../store/meetings';
import { useDispatch, useSelector } from 'react-redux';

import Meeting from './Meeting';


function Meetings(){
    //holds all meetings
    // const dispatch = useDispatch();
    // const meetings = useSelector(state => Object.values(state.session.user.meetings));

    // if (!meetings) return <div>No Meetings Can Be Found</div>

    // console.log(meetings);

    // return (
    //     <div>
    //         <div>meeting id, email, name, category, problem, notes, last updated</div>
    //         {meetings.map(meeting => <Meeting meeting={meeting}/>)}
    //     </div>
    // )
    return (
        <div>
            meeting here
        </div>
    )
}

export default Meetings;