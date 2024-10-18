import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'

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
    const result = await firebase.placeOrder(params.bookId).then(()=>alert("Order Placed")).catch((error)=>alert(error.message));
  }

  return (
    <Container className="my-5">
    <Card>
      <Row className="g-0">
        <Col md={4}>
          <Card.Img
            src={url}
            alt={`Cover of ${data.name}`}
            className="img-fluid rounded-start h-100 object-fit-cover"
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title as="h1" className="mb-4">{data.name}</Card.Title>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item>
                <strong>Price:</strong> ₹{data.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Author:</strong> {data.author}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>ISBN:</strong> {data.isbn}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Edition:</strong> {data.edition}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Genre:</strong> {data.genre}
              </ListGroup.Item>
            </ListGroup>
            <Card.Subtitle as="h2" className="mb-3">Owner Details</Card.Subtitle>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item>
                <strong>Name:</strong> {data.displayName || `username(${data.userEmail})`}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {data.userEmail}
              </ListGroup.Item>
            </ListGroup>
            <Button variant="primary" size="lg" onClick={()=>placeOrder()}>
              Buy Now
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  </Container>
  );
};

export default BookDetailPage;
