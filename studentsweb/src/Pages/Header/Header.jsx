import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return(
        <>
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand to="/"><strong>Student Management System</strong></Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" className="nav-link">Students</Nav.Link>
                    <Nav.Link as={Link} to="/student" className="nav-link">Add Student</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}

export default Header;