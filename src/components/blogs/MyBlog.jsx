import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function MyBlog({
  title,
  category,
  readTime,
  author,
  cover,
  content,
}) {
  return (
    <Col className="col-3 g-3">
      <Card>
        <Card.Img variant="top" src={cover} height={200} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div dangerouslySetInnerHTML={{ __html: content }}/>
          <Card.Text>{category}</Card.Text>
          <Card.Text>{author}</Card.Text>
          <Card.Text>{readTime}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
