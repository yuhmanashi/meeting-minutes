interface Meeting {
    id: number;
    userId: number;
    studentId: number;
    category: string;
    problems: string;
    notes: string;
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
    userId: number;
    title: string;
    body: string;
}

interface User {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    // meetings: Record<number, Meeting>
}

interface Student {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    coach: string;
    fullName: string;
    // meetings: Record<number, Meeting>
}

type Students = Student[];

interface MeetingWithStudent extends Meeting {
  studentName: string;
  studentEmail: string;
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