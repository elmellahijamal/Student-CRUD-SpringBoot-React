import { useEffect, useState } from "react";
import "./EditStudent.css"
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {

    const {id} = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        const ShowStudent = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/student/${id}`)
                const data = await response.json();

                setFormData(data)
            } catch (error) {
                console.error("error fetching student ", error.message)
            }
        }
        ShowStudent();
    },[id])


    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/student/${id}`,{
                method : 'PATCH',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("updated user" ,data);
            navigate(`/`);
        } catch (error) {
            console.error("error editing user : ", error.message)
        }

    }

    return(
        <>
          <div className="center-form">
            <h1>Edit Student:</h1>
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
                    Edit Student
                </Button>
            </Form>
        </div>
        </>
    )
}

export default EditStudent;