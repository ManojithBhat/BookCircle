import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import { useFirebase } from "../context/Firebase"

const RegisterPage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();
    
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log("signining up the user");
        const result = await firebase.signupUserWithEmailAndPassword(email,password);
        console.log("succesfully signed in the user",result);
    }

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate("/");
        }
    },[firebase,navigate]);  

  return(<div className="container mt-5">

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        onChange={(e)=>setEmail(e.target.value)} 
        type="email" 
        placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        onChange={(e)=>setPassword(e.target.value)}
        type="password" 
        placeholder="Password" />
      </Form.Group>

      <Button 
      variant="primary" 
      type="submit">
        CreateAccount
      </Button>
    </Form>
  </div>);
};

export default RegisterPage;
