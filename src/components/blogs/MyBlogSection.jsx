import React, { useEffect, useState } from "react";
import MyBlog from "./MyBlog";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from 'axios'

export default function MyBlogSection() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5050/posts?page=${currentPage}`
      );
      setPosts(response.data);
      setLoading(false);
      console.log(response.data)
    } catch (error) {
      if (error) setError(error);
    }
  };

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  return (
    <>
      <Container>
        <Row>
          {error && <h1>C'è stato un errore nel caricare i post</h1>}
          {!error && loading && <h1>Caricamento dei post ...</h1>}
          {!error &&
            !loading &&
            posts &&
            posts.posts?.map((post) => {
              return (
                <MyBlog
                  key={nanoid()}
                  title={post.title}
                  category={post.category}
                  content={post.content}
                  cover={post.cover}
                  readTime={post.readTime.value + " " + post.readTime.unit}
                  author={post.author.name}
                />
              );
            })}
        </Row>
        <Row>
          <Col className="m-3">
            <ResponsivePagination
              current={currentPage}
              total={posts && posts.totalPages}
              onPageChange={handlePagination}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
