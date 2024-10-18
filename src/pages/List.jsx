import React, { useState } from "react"
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap"
import { useFirebase } from "../context/Firebase"
import 'bootstrap/dist/css/bootstrap.min.css'

const ListingPage = () => {
  const firebase = useFirebase()
  const [name, setName] = useState("")
  const [ISBNnumber, setISBNnumber] = useState("")
  const [author, setAuthor] = useState("")
  const [price, setPrice] = useState("")
  const [coverPic, setCoverPic] = useState(null)
  const [edition, setEdition] = useState("")
  const [genre, setGenre] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await firebase.handleCreateNewListing(
        name,
        ISBNnumber,
        author,
        price,
        edition,
        genre,
        coverPic
      )
      setSuccess(true)
      setName("")
      setISBNnumber("")
      setAuthor("")
      setPrice("")
      setCoverPic(null)
      setEdition("")
      setGenre("")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!firebase.isLoggedIn) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Authentication Required</Alert.Heading>
          <p>Please log in to add a listing.</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title as="h2" className="mb-4">List Your Book Here</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Listing created successfully!</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBookName">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Book Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formISBN">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                placeholder="ISBN"
                value={ISBNnumber}
                onChange={(e) => setISBNnumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEdition">
              <Form.Label>Edition</Form.Label>
              <Form.Control
                type="number"
                placeholder="Set Edition"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBookGenre">
              <Form.Label>Book Genre</Form.Label>
              <Form.Select 
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">Select a genre</option>
                <option value="computer-science">Computer Science</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="comics">Comics</option>
                <option value="self-development">Self Development</option>
                <option value="higher-school">Higher School</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCoverPic">
              <Form.Label>Cover Page</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverPic(e.target.files?.[0] || null)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                'Create Listing'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ListingPage