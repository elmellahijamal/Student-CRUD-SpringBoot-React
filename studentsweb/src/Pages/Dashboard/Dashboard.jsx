import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const [students,setStudents] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const showStudents = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/students");
                const data = await response.json();
                setStudents(data)
            } catch (error) {
                console.error("Error showing students", error.message)
            }
        }
        showStudents();
    },[])

    const handleDelete = async(studentID) => {
        try {
            const response = await fetch(`http://localhost:8080/api/student/${studentID}`,{
                method : 'DELETE',
            })

            if(response.ok){
                setStudents((prevStudents) => (
                    prevStudents.filter((student) => student.id !== studentID)
                ))
            }

            console.log(`Student with ID ${studentID} deleted successfully`);
        } catch (error) {
            console.error("Error deleting Student" ,error.message)
        }
    }

    const handleEdit = (studentId) => {
        navigate(`/student/${studentId}`);
    }

    return (
        <>
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Students : </h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Class</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student._class}</td>
                                    <td>
                                        <Button variant="outline-secondary"
                                        onClick={() => handleEdit(student.id)}
                                        >Edit</Button>
                                        {" "}
                                        <Button variant="outline-danger"
                                        onClick={() => handleDelete(student.id)}
                                        >Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard;