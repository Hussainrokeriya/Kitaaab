import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useFirebase } from "../Context/Firebase";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';

const BookDetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [data, setData] = useState(null);
    const [qty, setQty] = useState(1);
    
    console.log(data);

    useEffect(() => {
        firebase.getBookbyId(params.bookId).then((value) => setData(value.data()));
    }, []);

    const placeOrder = async () => {
        const result = await firebase.placeOrder(params.bookId, qty);
        console.log('Order placed', result);
    }

    if(data === null) return <h1>Loading...</h1>

    return (
        <div className="container mt-5">
            <h1>Book Details:-</h1>
            <h3>{data.name}</h3>
            <h3>price: Rs. {data.price}/-</h3>
            <h1>Owner Details</h1>
            <h3>Name: Mr. {data.displayname}</h3>
            <h3>ISBN number: {data.isbn}</h3>
            <h3>Owner Contacts: {data.userEmail}</h3>
            <Form.Group className="mb-3 mt-2" controlId="formBasicPassword">
                <Form.Label>Enter Quantity</Form.Label>
                <Form.Control 
                    onChange={e => setQty(e.target.value)} 
                    value={qty}
                    type="Number" 
                    placeholder="Enter quantity" 
                />
            </Form.Group>
            <Button onClick={placeOrder} className="mt-2" variant="success">Buy Now</Button>
        </div>
    );
};

export default BookDetailPage;