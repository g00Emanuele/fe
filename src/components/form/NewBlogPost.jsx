import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";

const NewBlogPost = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  console.log(file);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]); // il file si trova sempre a e.target.files[0]
  };

  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);

    try {
      const response = await fetch("http://localhost:5050/posts/cloudUpload", {
        method: "POST",
        body: fileData,
      });
      return await response.json();
    } catch (error) {
      console.log(error, "Errore in uploadFile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.readTime = { value: Number(formData.readTime) };

    if (file) {
      try {
        const uploadCover = await uploadFile(file);
        console.log(uploadCover);

        const finalBody = {
          ...formData,
          cover: uploadCover.cover,
        };
        const response = await fetch("http://localhost:5050/posts/create", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(finalBody),
        });
        return await response.json();
      } catch (error) {
        if (error) console.log(error);
      }
    }
  };

  return (
    <Container>
      
      <Form
        encType="multipart/form-data"
        className="mt-5"
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            onChange={handleInputChange}
            size="lg"
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            onChange={handleInputChange}
            size="lg"
            placeholder="Author"
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover image</Form.Label>
          <Form.Control
            name="cover"
            onChange={onChangeSetFile}
            size="lg"
            type="file"
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Readtime</Form.Label>
          <Form.Control
            min={1}
            type="number"
            name="readTime"
            onChange={handleInputChange}
            size="lg"
            placeholder="Readtime"
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            onChange={handleInputChange}
            size="lg"
            as="select"
          >
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Form.Control
            name="content"
            onChange={handleInputChange}
            size="lg"
            placeholder="Content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
