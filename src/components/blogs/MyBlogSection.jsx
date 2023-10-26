import React, { useEffect, useState } from "react";
import MyBlog from "./MyBlog";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
require('dotenv').config()

export default function MyBlogSection() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const str = localStorage.getItem("loggedInUser");
  const token = str.substring(1, str.length - 1);
  const authorData = jwtDecode(token);

  const getPosts = async () => {
    console.log(token, authorData);

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setPosts(response.data);
      setLoading(false);
      console.log(posts)
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
                <>
                  <MyBlog
                    key={nanoid()}
                    title={post.title}
                    category={post.category}
                    content={post.content}
                    cover={post.cover}
                    readTime={post.readTime.value + " " + post.readTime.unit}
                    author={post.author.name}
                  />
                </>
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
