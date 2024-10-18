import React, { useEffect, useState } from "react"
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap'
import { useFirebase } from '../context/Firebase'
import BookCard from "../components/Card"
import 'bootstrap/dist/css/bootstrap.min.css'

const OrdersPage = () => {
  const firebase = useFirebase()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (firebase.isLoggedIn) {
        try {
          const bookDocs = await firebase.fetchOrders(firebase.user.uid)
          setBooks(bookDocs.docs)
        } catch (err) {
          setError("Failed to fetch orders. Please try again later.")
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [firebase])

  if (!firebase.isLoggedIn) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Authentication Required</Alert.Heading>
          <p>Please log in to view your orders.</p>
        </Alert>
      </Container>
    )
  }

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
      <h1 className="mb-4">Your Listing</h1>
      {books.length === 0 ? (
        <Alert variant="info">You haven't listed anything yet.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {books.map(book => (
            <Col key={book.id}>
              <BookCard link={`/book/orders/${book.id}`} id={book.id} {...book.data()} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default OrdersPage