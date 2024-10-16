import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Button } from "react-bootstrap";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      firebase.getImageURL(data.imageURL).then((url) => setUrl(url));
    }
  }, [data]);

  if (data === null) return <h1>Loading....</h1>;

  const username = (email) =>{
    return email.split('@')[0];
  }

  const placeOrder = async()=>{
    const result = await firebase.placeOrder(params.bookId);
  }

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <img
        src={url}
        alt="book picture"
        width="500px"
        style={{ borderRadius: "10px" }}
      />
      <h2>Details :</h2>
      <h4>Price : ₹ {data.price}</h4>
        <h4>Author : {data.author}</h4>
        <h4>ISBN : {data.isbn}</h4>
      <h2>Owner Details</h2>
        {data.displayName ? <h4> Name : {data.displayName}</h4> : <h4>Name : username(data.userEmail)</h4>}
        <h4>Email : {data.userEmail}</h4>
        <Button variant="success" onClick={placeOrder}>Buy Now</Button>
    </div>
  );
};

export default BookDetailPage;
