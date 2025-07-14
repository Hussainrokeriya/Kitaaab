import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../Context/Firebase";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";

const LoginPage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(firebase.isLoggedIn) {
            navigate("/");
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("login in a user...");
        try {
            const result = await firebase.singinUserWithEmailAndPass(email, password);
            console.log("Successfull", result);
            navigate("/HomePage");
            alert("Login Successfull");
        } catch (error) {
            console.error("Login error:", error);
            alert("Invalid credentials");
        }
    };

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
                <Button variant="primary" type="submit">Login</Button>
            </Form>
            <h1 className="mt-3 mb-5">OR</h1>
            <Button variant="danger" onClick={firebase.SigninWithGoogle}>Signin with Google</Button>
            <div className="mt-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary text-decoration-none">Sign up here</Link>
            </div>
        </div>
    );
}

export default LoginPage;