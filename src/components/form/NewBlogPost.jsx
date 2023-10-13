import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios'

const NewBlogPost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  
  const [formData, setFormData] = useState({});

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

    formData.readTime = { value: parseInt(formData.readTime) };
    formData.author = { name: formData.author };

    try {
      const response = await fetch("http://localhost:5050/posts/create", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      return response;
    } catch (error) {
      console.log(e);
    }

  };

  useEffect(() => {
    let content = convertToHTML(editorState.getCurrentContent());
    // setContent(content);
    //console.log(html);
    setFormData({
      ...formData,
      content,
    });
  }, [editorState]);

  
  return (
    <Container>
      <Form className="mt-5" onSubmit={handleSubmit}>
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
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
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
