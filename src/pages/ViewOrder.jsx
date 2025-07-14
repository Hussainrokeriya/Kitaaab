import React, {useEffect, useState} from "react";
import { useFirebase } from "../Context/Firebase";
import BookCard from "../Components/cards";

const OrdersPage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (firebase.isLoggedin)
            firebase.fetchMyBooks(firebase.user.uid)?.then((books) => setBooks(books.docs));
    }, [firebase]);

    console.log(books);

    if(!firebase.isLoggedin) return <h1>Please log in!</h1>

    return  (
        <div>
            {
                books.map((book) => (
                <BookCard 
                    link={`/book/orders/${book.id}`} 
                    key={book.id} 
                    id={book.id} 
                    {...book.data()}
                />))
            }
        </div>
    );
};

export default OrdersPage;