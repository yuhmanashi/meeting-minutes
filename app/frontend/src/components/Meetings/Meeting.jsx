import React from "react";


function Meeting({ meeting }) {
    // holds a single meeting (row)
    const  {id, category, student, problem, notes, studentEmail, updatedAt} = meeting;
    //id, studentEmail, student(name), category, problem, notes, updatedAt
    return (
        <div>
            {id} {studentEmail} {student} {category} {problem} {notes} {updatedAt}
        </div>
    )
}

export default Meeting;