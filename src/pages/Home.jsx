import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { useFirebase } from "../Context/Firebase";
import "./Home.css";
import BookCard from "../Components/cards";
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {firebase.listAllbooks().then((books) => setBooks(books.docs));}, []);

    return  <div className="container mt-5">
                    {books.map((book) => (
                    <BookCard 
                        link={`/book/view/${book.id}`} 
                        key={book.id} 
                        id={book.id} 
                        {...book.data()}
                        />
                    ))}
            </div>;
};

export default HomePage;