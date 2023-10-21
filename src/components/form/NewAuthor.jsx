import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function NewAuthor() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]); // il file si trova sempre a e.target.files[0]
  };

  const uploadFile = async (avatar) => {
    const fileData = new FormData();
    fileData.append("avatar", avatar);

    try {
      const response = await fetch(
        "http://localhost:5050/authors/cloudUpload",
        {
          method: "POST",
          body: fileData,
        }
      );
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

    try {
      const uploadAvatar = await uploadFile(file);
      console.log(uploadAvatar);

      const finalBody = {
        ...formData,
        avatar: uploadAvatar.avatar,
      };
      const response = await fetch("http://localhost:5050/authors/create", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(finalBody),
      });
      return await response.json();
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="mt-5"
      >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleInputChange} name="name" type="text" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="surname"
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            name="avatar"
            onChange={onChangeSetFile}
            size="lg"
            type="file"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="birthday"
            type="text"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default NewAuthor;
