import React,{useEffect,useState} from "react";
import { useFirebase } from '../context/Firebase';
import BookCard from "../components/Card";

const OrdersPage = () =>{
    const firebase = useFirebase();
    const [books,setBooks] =  useState([]);

    useEffect(()=>{
        if(firebase.isLoggedIn){
            firebase.fetchOrders(firebase.user.uid)?.then(book=>setBooks(book.docs));
        }
    },[firebase]);

    if(!firebase.isLoggedIn){
        return <h1>Please Login to view your orders</h1>
    }
    return (
        (
            books.map(book=><BookCard link = {`/book/orders/${book.id}`} key={book.id} id={book.id} {...book.data()}/>)
        )
    )
}

export default OrdersPage;