import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../Context/Firebase";

const RegisterPage = () => {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
            if(firebase.isLoggedIn) {
                navigate("/");
            }
        }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Signing up a user...')
        const result = await firebase.signupUserWithEmailAndPassword(email, password);
        console.log('Successfull', result);
    };

    console.log("firebase", firebase);
    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        onChange={e => setEmail(e.target.value)} 
                        value={email}
                        type="email" 
                        placeholder="Enter email" 
                    />
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        onChange={e => setPassword(e.target.value)} 
                        value={password}
                        type="password" 
                        placeholder="Password" 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Create Account</Button>
                <div className="mt-2">
                    Already have an account? {" "}<Link to="/login" className="text-primary text-decoration-none">Login</Link>
                </div>
            </Form>
        </div>
    )
}

export default RegisterPage;