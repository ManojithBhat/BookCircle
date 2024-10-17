import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <section className="hero-section vh-100 d-flex align-items-center bg-light">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={7} className="p-5">
              <h1 className="display-4 fw-bold mb-4">Welcome to BookCircle</h1>
              <p className="lead mb-4">
                A platform to lend and sell books within your campus.
              </p>
              <p className="mb-4">
                BookCircle revolutionizes the way students access textbooks and
                academic resources. Our platform connects you with fellow
                students, allowing you to lend, borrow, or sell books easily and
                affordably. Join our community and start saving on your
                educational expenses today!
              </p>
              <Link to="/book/list">
                <Button variant="primary" size="lg" className="mb-4 me-3">
                  Get Started
                </Button>
              </Link>
              <Link to="/book/list">
                <Button variant="outline-secondary" size="lg" className="mb-4">
                  List Your Books
                </Button>
              </Link>
              <div>
                <a
                  href="https://github.com/ManojithBhat/BookCircle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  Check us out on GitHub
                </a>
              </div>
            </Col>
            <Col md={5} className="text-end p-0">
              <img
                src="https://freesvg.org/img/Buecher-coloured.png"
                alt="Books"
                className="img-fluid w-75 h-auto object-fit-cover"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-section py-5 bg-white">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/borrow-book-2078990-1757778.png"
                alt="About BookCircle"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">About BookCircle</h2>
              <p className="lead mb-4">
                BookCircle is a peer-to-peer book lending platform for students.
                We provide a simple, secure, and convenient way for students to
                connect and share their books within the campus.
              </p>
              <p className="mb-4">
                Our mission is to make education more accessible and affordable
                by creating a community of learners who support each other. By
                sharing resources, we not only save money but also reduce waste
                and promote sustainability in education.
              </p>
              <Link to="/register">
              <Button variant="outline-primary" size="lg">
                Sign Up Now
              </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="features-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Why Choose BookCircle?</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Save Money</Card.Title>
                  <Card.Text>
                    Buy used textbooks at a fraction of
                    the cost of new ones. Save up to 80% on your textbook
                    expenses!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Easy to Use</Card.Title>
                  <Card.Text>
                    Our user-friendly platform makes it simple to list your
                    books, find the ones you need, and connect with other
                    students on campus.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Build Community</Card.Title>
                  <Card.Text>
                    Connect with fellow students, share knowledge, and
                    contribute to a collaborative learning environment on your
                    campus.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="how-it-works py-5 bg-white">
        <Container>
          <h2 className="text-center mb-5">How It Works</h2>
          <Row>
            <Col md={4} className="mb-4">
              <h3 className="h4 mb-3">1. Sign Up</h3>
              <p>
                Create your free account using your student email. Verify your
                account to join your campus community.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <h3 className="h4 mb-3">2. List or Search</h3>
              <p>
                List your available books or search for the textbooks you need.
                Our smart search helps you find the right editions.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <h3 className="h4 mb-3">3. Connect and Exchange</h3>
              <p>
                Arrange to meet on campus or use our secure messaging system to
                coordinate book exchanges or purchases.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section py-5 bg-primary text-white text-center">
        <Container>
          <h2 className="mb-4">Ready to Start Saving?</h2>
          <p className="lead mb-4">
            Join Hundereds of students already using BookCircle to save money
            and share resources.
          </p>
          <Link to="/register">
          <Button variant="light" size="lg">
            Sign Up Now
          </Button>
          </Link>
        </Container>
      </section>

      <footer className="bg-dark text-light py-4 mt-auto">
        <Container>
          <Row>
            <Col md={4} className="mb-3 mb-md-0">
              <h5>About BookCircle</h5>
              <p className="small mb-0">
                BookCircle is a student-led initiative aimed at making textbooks
                more accessible and affordable for all.
              </p>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <h5>Quick Links</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="/" className="text-light">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light">
                    Books
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light">
                    List book
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light">
                    Orders
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Contriute to our mission</h5>
              <p className="small mb-0">
                Found any bugs or issues? Want to contribute to the project?
                Visit our GitHub repository and submit a pull request.  
                
              </p>
            </Col>
          </Row>
          <hr className="my-4" />
          <Row>
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0">
                &copy; 2023 BookCircle. All rights reserved.
              </p>
            </Col>
            
          </Row>
        </Container>
      </footer>
    </div>
  );
}
