import React, { useState } from 'react';
import StudentCard from './StudentCard.js';

function StudentList() {
    const [students, setStudents] = useState([
        { name: 'Vignesh', major: 'ECE', year: '2026' }
    ]);

    const addStudent = () => {
        const name = prompt('Enter name:');
        const major = prompt('Enter major:');
        const year = prompt('Enter year:');
        setStudents([...students, { name, major, year }]);
    };

    const removeStudent = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };

    return (
        <div>
            <button onClick={addStudent}>Add Student</button>
            {students.map((student, index) => (
                <div key={index}>
                    <StudentCard {...student} />
                    <button onClick={() => removeStudent(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default StudentList;
