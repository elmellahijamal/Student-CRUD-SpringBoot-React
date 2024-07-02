import { useState } from "react";
import "./AddStudent.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        _class: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch("http://localhost:8080/api/student", {
                method : 'POST',
                headers : {'Content-type' : "application/json"},
                body : JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Student added : ",data);
            navigate("/");
        } catch (error) {
            console.log("Error adding user : " , error.message)
        }
    };

    return (
        <div className="center-form">
            <h1>Add Student:</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter the name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter the email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Enter the phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicClass">
                    <Form.Control
                        type="text"
                        name="_class"
                        placeholder="Enter the class"
                        value={formData._class}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Add Student
                </Button>
            </Form>
        </div>
    );
};

export default AddStudent;
