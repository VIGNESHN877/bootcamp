import React from 'react';
import './App.css';
import StudentList from './StudentList';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Student Management System</Navbar.Brand>
        </Container>
      </Navbar>
      
      <Container className="mt-4">
        <StudentList />
      </Container>
    </div>
  );
}

export default App;