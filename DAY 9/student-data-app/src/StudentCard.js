import React from 'react';

const StudentCard = ({ student }) => {
  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img 
        src={`https://i.pravatar.cc/150?img=${student.id}`} 
        className="card-img-top mt-3 rounded-circle mx-auto" 
        alt={student.name}
        style={{ width: '100px', height: '100px' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{student.name}</h5>
        <p className="card-text">
          <small className="text-muted">ID: {student.id}</small><br />
          Email: {student.email}<br />
          Major: {student.company?.bs || 'Undeclared'}<br />
          Year: {student.address?.city || 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;