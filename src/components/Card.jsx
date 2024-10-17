import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setUrl(url));
  }, []);

  return (
      <Card style={{ width: "18rem",margin:"15px" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            This book has a title {props.name} of {props.edition} edtion with
            ISBN number {props.ISBNnumber} and is written by {props.author}
            <br></br>
            Sold by {props.Email} for {props.price}
          </Card.Text>
          <Button onClick={ e=>navigate(props.link) } variant="primary">View</Button>
        </Card.Body>
        </Card>
  );
};

export default BookCard;
