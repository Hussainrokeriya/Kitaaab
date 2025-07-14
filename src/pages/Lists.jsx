import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from "../Context/Firebase";

const ListingPage = () => {
    
    const firebase = useFirebase();
    const [name, setName] = useState("");
    const [nums, setNums] = useState("");
    const [price, setPrice] = useState("");
    const [displayname, setDisplayname] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.handlecreateAddlisting(name, nums, price, displayname)
    };
    
    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control 
                        onChange={e => setName(e.target.value)} 
                        value={name}
                        type="text" 
                        placeholder="Enter book name" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN number</Form.Label>
                    <Form.Control 
                        onChange={e => setNums(e.target.value)} 
                        value={nums}
                        type="text" 
                        placeholder="Enter ISBN number" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter your price</Form.Label>
                    <Form.Control 
                        onChange={e => setPrice(e.target.value)} 
                        value={price}
                        type="text" 
                        placeholder="Enter your price" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control 
                        onChange={e => setDisplayname(e.target.value)} 
                        value={displayname}
                        type="text" 
                        placeholder="Enter your name" 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Add Book</Button>
            </Form>
        </div>
    );
};

export default ListingPage;