import React from 'react';
import './StudentCard.css';


function StudentCard({ name, major, year }) {
    const yearColors = {
        Freshman: 'green',
        Sophomore: 'yellow',
        Junior: 'orange',
        Senior: 'red'
    };

    return (
        <div style={{ backgroundColor: yearColors[year] || 'white', padding: '15px', margin: '10px' }}>
            <h3>{name}</h3>
            <p>Major: {major}</p>
            <p>Year: {year}</p>
        </div>
    );
}

export default StudentCard;
