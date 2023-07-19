//React
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

//MUI
import Button from '@mui/material/Button';

//Components
import GenericTable from '../CommonComponents/Table';
import UpdateMeetingModal from './UpdateMeetingModal';
import DeleteMeetingButton from './DeleteMeetingButton';

//Misc
import * as meetingsActions from '../../store/meetings';
import * as studentActions from '../../store/students';

type IMeetings = {
  meetings: MeetingWithStudent[];
  students: Student[];
  user: User;
}

export default function Meetings({ meetings, user, students }: IMeetings) {
  const userMeetings = Object.values(meetings).filter((meeting: MeetingWithStudent) => meeting.userId === user.id);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);

  const updatedMeetings = userMeetings.map(meeting => {
    const student = students[meeting.studentId];
    const newMeeting = { ...meeting }
    newMeeting['studentName'] = `${student.fullName}`;
    newMeeting['studentEmail'] = student.email;
    newMeeting['createdAt'] = new Date(meeting.createdAt).toLocaleDateString()
    return newMeeting;
  });
  
  const meetingButtons = (meeting) => {
    return (
      <React.Fragment>
        <UpdateMeetingModal meeting={meeting}/>
        <DeleteMeetingButton meeting={meeting}/>
      </React.Fragment>
    )
  };

  const values = [
    {
      label: 'Name',
      id: 'studentName'
    },
    {
      label: 'Email',
      id: 'studentEmail'
    },
    {
      label: 'Category',
      id: 'category'
    },
    {
      label: 'Date',
      id: 'createdAt'
    }
  ];

  const details = [
    {
      label: 'Problems',
      id: 'problems'
    },
    {
      label: 'Notes',
      id: 'notes'
    }
  ];

  return (
    <GenericTable list={updatedMeetings} values={values} details={details} buttons={meetingButtons} page={page} setPage={setPage} />
  );
}