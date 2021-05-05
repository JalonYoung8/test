import { useState, useEffect } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Movie = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="movie-box">
          <Link to={`/movie?_id=${post._id}`}>
            <Row>
              <Col lg="8" md="7" xs="12">
                <h1 className="movie-heading">{post.title}</h1>
              </Col>
              <Col lg="4" md="5" xs="12">
                <h4 className="star-heading">AVG Rating</h4>
                <Nav className="star-nav" as="ul">
                  {post.rating === "1" ? (
                    <Nav.Item as="li">
                      <i className="fa fa-star"></i>
                    </Nav.Item>
                  ) : post.rating === "2" ? (
                    <>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                    </>
                  ) : post.rating === "3" ? (
                    <>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                    </>
                  ) : post.rating === "4" ? (
                    <>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                    </>
                  ) : post.rating === "5" ? (
                    <>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                    </>
                  ) : (
                    ""
                  )}
                </Nav>
              </Col>
            </Row>
            <div className="check-area">
              <Row>
                {post.cast1 ? (
                  <Col lg="4" md="4" xs="12">
                    <div className="bors text-center">
                      <label>{post.cast1}</label>
                    </div>
                  </Col>
                ) : (
                  ""
                )}
                {post.cast2 ? (
                  <Col lg="4" md="4" xs="12">
                    <div className="bors text-center">
                      <label>{post.cast2}</label>
                    </div>
                  </Col>
                ) : (
                  ""
                )}
                {post.cast3 ? (
                  <Col lg="4" md="4" xs="12">
                    <div className="bors text-center">
                      <label>{post.cast3}</label>
                    </div>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Movie;
