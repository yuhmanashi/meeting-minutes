interface Meeting {
    id: number;
    userId: number;
    studentId: number;
    category: string;
    problems: string;
    notes: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

interface Watchlist {
    userId: number;
    studentId: number;
    note: string;
    tag: string | number;
}

interface Pin {
    authorId: number;
    title: string;
    body: string;
    createdAt: string;
}

interface User {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
}

interface Student {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    coach: string;
    fullName: string;
}

type Students = Student[];

interface MeetingWithStudent extends Meeting {
  studentName: string;
  studentEmail: string;
  dateString: string;
}

interface Session { 
    user: User;
}

type SessionState = {
    session: Session;
}

type SessionAction = {
    type: string;
    payload: Session;
}

type DispatchSessionType = (args: SessionAction) => SessionAction

//

interface Error {
    messages: string;
}

type SessionErrorsState = {
    errors: Error[];
}

type SessionErrorsAction = {
    type: string;
    errors: Error[];
}

type DispatchSessionErrorType = (args: SessionErrorsAction) => SessionErrorsAction