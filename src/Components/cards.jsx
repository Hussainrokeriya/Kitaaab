import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';

const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url, setURL] = useState(null);
    console.log(props);
    return (
        <Card style={{ width: '18rem', margin: "25px"}}>
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
            This book has a name {props.name} and this book is sold by Mr. {props.displayname} and this book costs only Rs. {props.price}/-
            </Card.Text>
            <Button variant="primary" onClick={e => navigate(props.link)}>View</Button>
        </Card.Body>
        </Card>
    );
};

export default BookCard;