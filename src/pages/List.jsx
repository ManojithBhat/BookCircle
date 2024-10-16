import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const ListingPage = () => {
  const firebase = useFirebase();
  const [name, setName] = useState("");
  const [ISNBNnumber, setISBNnumber] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [edition, setEdition] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(
      name,
      ISNBNnumber,
      author,
      price,
      edition,
      genre,
      coverPic
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="py-5">List Your Book Here </h2>
      <Form onSubmit={handleSubmit} className="">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name </Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Book Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN </Form.Label>
          <Form.Control
            onChange={(e) => setISBNnumber(e.target.value)}
            type="text"
            placeholder="ISBN"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Author </Form.Label>
          <Form.Control
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            placeholder="Author"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Edition </Form.Label>
          <Form.Control
            onChange={(e) => setEdition(e.target.value)}
            type="number"
            placeholder="Set Edition"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookGenre">
          <Form.Label>Book Genre</Form.Label>
          <Form.Select onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select a genre</option> 
            <option value="computer-science">Computer Science</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="comics">Comics</option>
            <option value="higher-school">Higher School</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Page</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price </Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            type="string"
            placeholder="Price"
          />
        </Form.Group>
        <Button variant="primary" type="submit"> Create </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
