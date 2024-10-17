import React, {useEffect,useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import CardGroup from "react-bootstrap/CardGroup";

const BookPage = ()=>{

    const firebase = useFirebase();
    const [books,setBooks] =  useState([]);

    useEffect(()=>{
        firebase.listAllBooks()
        .then(books => setBooks(books.docs));
        
    },[])

    return (
        <div className = "container mt-5">
            <CardGroup>
           {books.map((book)=>{
                return(
                    <BookCard key={book.id} link = {`/book/view/${book.id}`} id={book.id} {...book.data()}/>
                )
           })}
        </CardGroup>
        </div>
    )
};

export default BookPage;