import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
require('dotenv').config()

const LoginForm = () => {
  const [loginData, setLoginData] = useState({});
  const [login, setLogin] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const redirectGithubLogin = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.token));
        navigate("/home");
      }
      setLogin(data);
      console.log(data);
    } catch (error) {
      if (error) console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-5 h-100">
        <Row className="d-flex justify-content-center p-5">
          <Col className="col-4 bg-light p-2">
            <h1 className="mt-3">Login page</h1>
            <Form onSubmit={handleSubmit} className="mt-5 d-flex flex-column">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <div className="mt-3 d-flex justify-content-between">
              <Button variant="primary" type="button" href="/newauthor">
                Sign up
              </Button>
              <Button
                onClick={() => redirectGithubLogin()}
                variant="light bg-white"
                type="button"
              >
                Login with Github
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;
