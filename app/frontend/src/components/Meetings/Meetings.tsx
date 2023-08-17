//React
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

//MUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

//Components
import GenericTable from '../CommonComponents/Table';
import UpdateMeetingModal from './UpdateMeetingModal';
import DeleteMeetingButton from './DeleteMeetingButton';

//Misc
import * as meetingsActions from '../../store/meetings';
import * as studentActions from '../../store/students';

type IMeetings = {
  meetings: Meeting[];
  students: Student[];
  categories: string[];
}

export default function Meetings({ meetings, students, categories }: IMeetings) {
  const [page, setPage] = useState(0);

  const updatedMeetings = meetings.map(meeting => {
    const student = students[meeting.studentId];
    const newMeeting = { ...meeting };

    newMeeting['studentName'] = `${student.fullName}`;
    newMeeting['studentEmail'] = student.email;
    newMeeting['date'] = new Date(meeting.date).toLocaleDateString();

    return newMeeting;
  });
  
  const meetingButtons = (meeting) => {
    return (
      [
        <UpdateMeetingModal meeting={meeting} categories={categories}/>,
        <DeleteMeetingButton meeting={meeting}/>
      ]
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
      id: 'date'
    }
  ];

  const responsiveValues = [
    {
      label: 'Name',
      id: 'studentName'
    },
    {
      label: 'Category',
      id: 'category'
    },
  ]
  // const details = [
  //   {
  //     label: 'Problems',
  //     id: 'problems'
  //   },
  //   {
  //     label: 'Notes',
  //     id: 'notes'
  //   }
  // ];

  const details = [];
  return (
    <Box>
      <GenericTable list={updatedMeetings} values={values} rValues={responsiveValues} details={details} buttons={meetingButtons} page={page} setPage={setPage} />
    </Box>
  );
}