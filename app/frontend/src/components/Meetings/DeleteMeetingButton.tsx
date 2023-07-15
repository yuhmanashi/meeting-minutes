import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import * as sessionErrorActions from '../../store/session_errors';
import * as meetingsActions from '../../store/meetings';

import Button from '@mui/material/Button';

type IMeeting = {
  meeting: Meeting
}

export default function DeleteMeetingButton({ meeting }: IMeeting){
    const dispatch = useAppDispatch();
    
    function handleDelete(e) {
        e.preventDefault();
        return dispatch(meetingsActions.deleteMeeting(meeting.id))
    }

    return (
        <Button size="small" onClick={handleDelete}>Delete</Button>
    )
}