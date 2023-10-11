import React, { useEffect, useState } from "react";
import MyBlog from "./MyBlog";
import { Container, Row } from "react-bootstrap";
import { nanoid } from "nanoid";

export default function MyBlogSection() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5050/posts");
      const data = await response.json();
      setPosts(data);
      setLoading(false);
      console.log(posts)
    } catch (error) {
      if (error) setError(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <>
      <Container>
        <Row>
            {error && <h1>C'è stato un errore nel caricare i post</h1>}
            {!error && loading && <h1>Caricamento dei post ...</h1>}
            {!error &&
              !loading &&
              posts.map((post) => {
                return <MyBlog 
                key={nanoid()} 
                title={post.title}
                category={post.category}
                content={post.content}
                cover='https://picsum.photos/200/300'
                readTime={post.readTime.value +' '+ post.readTime.unit} 
                author={post.author.name} />;
              })}
        </Row>
      </Container>
    </>
  );
}
