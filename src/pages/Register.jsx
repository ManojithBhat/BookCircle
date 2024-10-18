import React, { useState, useEffect } from "react"
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useFirebase } from "../context/Firebase"
import 'bootstrap/dist/css/bootstrap.min.css'

const RegisterPage = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await firebase.signupUserWithEmailAndPassword(email, password)
      setSuccess(true)
      setEmail("")
      setPassword("")
      setTimeout(() => navigate("/"), 2000) // Redirect after 2 seconds
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError("")
    try {
      await firebase.signinWithGoogle()
      navigate("/")
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/")
    }
  }, [firebase, navigate])

  if (firebase.isLoggedIn) {
    return null // or a loading spinner if you prefer
  }

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title as="h1" className="text-center mb-4">Create Account</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Account created successfully! Redirecting...</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </Form.Group>

            <div className="d-grid gap-2">
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
                  'Create Account'
                )}
              </Button>
            </div>
          </Form>
          
          <div className="text-center my-3">Or</div>
          
          <div className="d-grid gap-2">
            <Button
              onClick={handleGoogleSignIn}
              variant="danger"
              disabled={loading}
            >
              Sign Up With Google
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RegisterPage