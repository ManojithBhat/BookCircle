import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap'

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [error, setError] = useState(null);

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
    if (!firebase.isLoggedIn) {
      setLoggedIn(false);
    }else{
        await firebase.placeOrder(params.bookId).then(()=>setIsOrderPlaced(true)).catch((error)=>setError(true));
    }
  }

  if (loggedIn === false) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Authentication Required</Alert.Heading>
          <p>Please log in to view your orders.</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Alert variant="success" show={isOrderPlaced}>
          <Alert.Heading>Order Placed</Alert.Heading>
      </Alert>
      <Alert variant="danger" show={error}>
          <Alert.Heading>Error</Alert.Heading>
          <p>Failed to place order. Please try again later.</p>
      </Alert>
      
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
