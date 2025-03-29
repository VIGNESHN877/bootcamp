import React, { useState, useEffect } from 'react'; 
import StudentCard from './StudentCard';
import './StudentList.css'; // We'll create this next

const StudentList = () => {
    const [students, setStudents] = useState([]); // Newly added state to hold students
    
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 6; // 6 cards per page
    const [refreshCount, setRefreshCount] = useState(0);   


    const [filteredStudents, setFilteredStudents] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

    // Additional state variables...

    useEffect(() => {
        // Your effect logic...
    }, []);

    // Return JSX...


    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users?_=${refreshCount}`);
                const data = await response.json();
                setStudents(data);
                setFilteredStudents(data); // Initialize filteredStudents with the fetched data
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
            
        };

        fetchStudents();
    }, [refreshCount]);

    // Filter students based on searchTerm
    useEffect(() => {
        const results = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toString().includes(searchTerm)
        );
        setFilteredStudents(results);
    }, [searchTerm, students]);

    // Get current students for pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const handleRefresh = () => {
        setRefreshCount(prev => prev + 1);
    };

    

    return (
        <div className="student-list-container">
            <h2 className="text-center mb-4">Student Directory</h2>
            
            <div className="row justify-content-center mb-4">
                <div className="col-md-6 d-flex">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button 
                        className="btn btn-primary"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        {loading ? 'Refreshing...' : 'Refresh Data'}
                    </button>
                </div>
            </div>

            <div className="row">
                {currentStudents.length > 0 ? (
                    currentStudents.map(student => (
                        <div className="col-md-4 mb-4" key={student.id}>
                            <StudentCard student={student} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No students found matching your search.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                        
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};
// Example of using the response or error variable

export default StudentList;