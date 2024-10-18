import React, { useState, useEffect   } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase"

const LoginPage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();
    
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate("/");
        }
    },[firebase,navigate]);

    console.log(firebase);

    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log("Login the user");
        const result = await firebase.siginUserWithEmailAndPassword(email,password);
        console.log("succesfully logged in the user",result);
    }

  return(
  <div className="container mt-5 mx-auto" style={{ maxWidth: '400px' }}>
<h4 className="mt-2 mb-2"> Login </h4>
    <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        onChange={(e)=>setEmail(e.target.value)} 
        type="email" 
        placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        onChange={(e)=>setPassword(e.target.value)}
        type="password" 
        placeholder="Password" />
      </Form.Group>

      <Button variant="primary">Sign In</Button>
      <p className="m-2">Or</p>


      <Button
      onClick={e=>firebase.signinWithGoogle()} 
      variant="danger" 
      type="submit">
        Sign In With Google
      </Button>
    </Form>
  </div>);
};

export default LoginPage;
