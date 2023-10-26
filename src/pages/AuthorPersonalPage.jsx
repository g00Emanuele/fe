import React from "react";
import jwtDecode from "jwt-decode";
import {Card, ListGroup} from "react-bootstrap"

const AuthorPersonalPage = () => {
  const str = localStorage.getItem("loggedInUser");
  const token = str.substring(1, str.length - 1);
  const authorData = jwtDecode(token);
  console.log(authorData)
  return (
    <>

     <div className="d-flex flex-column align-items-center">
     <h1 className="mt-2">Bentornato {authorData.name && authorData.name + " " + authorData.surname}
     {!authorData && authorData.username}</h1>

      <Card style={{ width: '25rem' }}>
      <Card.Img variant="top" src={authorData.avatar} />
      <Card.Body>
        <Card.Title>Name: {authorData.name}</Card.Title>
        <Card.Title>Surname: {authorData.surname}</Card.Title>
        <Card.Title>Email: {authorData.email}</Card.Title>
      </Card.Body>
    </Card>
    </div>
    </>
   
  );
};

export default AuthorPersonalPage;
