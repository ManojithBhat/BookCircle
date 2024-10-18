import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Card, Alert, Spinner, ListGroup } from 'react-bootstrap'
import { useFirebase } from "../context/Firebase"
import 'bootstrap/dist/css/bootstrap.min.css'

const ViewOrderDetails = () => {
  const params = useParams()
  const firebase = useFirebase()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await firebase.getOrders(params.bookId)
        setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})))
      } catch (err) {
        setError("Failed to fetch order details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [firebase, params.bookId])

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Order Details</h1>
      {orders.length === 0 ? (
        <Alert variant="info">No orders found for this book.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {orders.map((order) => (
            <Col key={order.id}>
              <Card>
                <Card.Body>
                  <Card.Title>Order {order.id}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Ordered By:</strong> {order.userEmail}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default ViewOrderDetails