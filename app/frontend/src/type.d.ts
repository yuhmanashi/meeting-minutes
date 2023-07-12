interface Meeting {
    id: string | number
    userId: string | number
    category: string | number
    name: string | number
    problems: string | number
    notes: string | number
    email: string | number
    createdAt: string | number
    updatedAt: string | number
}

interface User {
    createdAt: string
    email: string
    firstName: string
    id: number
    lastName: string
    meetings: Record<number, Meeting>
}

interface Session { 
    user: User
}

type SessionState = {
    session: Session
}

type SessionAction = {
    type: string
    payload: Session
}

type DispatchSessionType = (args: SessionAction) => SessionAction

//

interface Error {
    messages: string
}

type SessionErrorsState = {
    errors: Error[]
}

type SessionErrorsAction = {
    type: string
    errors: Error[]
}

type DispatchSessionErrorType = (args: SessionErrorsAction) => SessionErrorsAction