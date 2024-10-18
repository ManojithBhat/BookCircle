import React, {useEffect,useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import { Row, Col } from "react-bootstrap";

const BookPage = ()=>{

    const firebase = useFirebase();
    const [books,setBooks] =  useState([]);

    useEffect(()=>{
        firebase.listAllBooks()
        .then(books => setBooks(books.docs));
        
    },[])

    return (
        <div className = "container mt-5">
            <h1>Books that you may need </h1>
            <Row xs={1} md={2} lg={3} className="g-4">
          {books.map(book => (
            <Col key={book.id}>
              <BookCard key={book.id} link = {`/book/view/${book.id}`} id={book.id} {...book.data()}/>
            </Col>
          ))}
        </Row>
        </div>
    )
};

export default BookPage;