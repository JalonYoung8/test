import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useState, useEffect } from "react";
import { Col, Container, Nav, Row,Alert } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { getRequest, postRequestForm } from "../api/Helper";
import InputField from "../Components/InputField";
import Layout from "../Components/Layout";

function SingleMovie(props) {
  const [isSent, setIsSent] = useState(false);
  const [israting, setIsrating] = useState(0);
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is Required";
    }
    if (!values.review) {
      errors.review = "Review is Required";
    }
    if (!values.rating) {
      errors.rating = "Rating is Required";
    }
    return errors;
  };
  const getOneMovie = async () => {
    try {
      // console.log({_skip:skip,_limit:moviePerPage});
      var params = props.location.search.slice(5);
      const response = await getRequest(
        `/api/movie/getSingleMovie/${params}`,
        ""
      );
      if (response.result.status === 200) {
        console.log("movie", response.result.data);
        setMovie(response.result.data.filteredMovie);
        setReviews(response.result.data.reviews);
      }
    } catch (error) {
      console.log("getAllMovies Error", error.message);
    }
  };
  useEffect(() => {
    getOneMovie();
  }, []);
  return (
    <>
      <Layout>
        <section className="movie-area">
          <Container>
            <div key={movie._id} className="movie-box">
              <Row>
                <Col lg="8" md="7" xs="12">
                  <h1 className="movie-heading">{movie.title}</h1>
                </Col>
                <Col lg="4" md="5" xs="12">
                  <h4 className="star-heading">AVG Rating</h4>
                  <Nav className="star-nav" as="ul">
                    {movie.rating === "1" ? (
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                    ) : movie.rating === "2" ? (
                      <>
                        <Nav.Item as="li">
                          <i className="fa fa-star"></i>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <i className="fa fa-star"></i>
                        </Nav.Item>
                      </>
                    ) : movie.rating === "3" ? (
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
                    ) : movie.rating === "4" ? (
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
                    ) : movie.rating === "5" ? (
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
                  {movie.cast1 ? (
                    <Col lg="4" md="4" xs="12">
                      <div className="bors text-center">
                        <label>{movie.cast1}</label>
                      </div>
                    </Col>
                  ) : (
                    ""
                  )}
                  {movie.cast2 ? (
                    <Col lg="4" md="4" xs="12">
                      <div className="bors text-center">
                        <label>{movie.cast2}</label>
                      </div>
                    </Col>
                  ) : (
                    ""
                  )}
                  {movie.cast3 ? (
                    <Col lg="4" md="4" xs="12">
                      <div className="bors text-center">
                        <label>{movie.cast3}</label>
                      </div>
                    </Col>
                  ) : (
                    ""
                  )}
                  <Col lg="6" md="6" xs="12">
                    <h3 className="bottm-movie-caption">
                      Year Released: {movie.release_year}
                    </h3>
                  </Col>
                  <Col lg="6" md="6" xs="12">
                    <h3 className="bottm-movie-caption">
                      Time to Watch: {movie.duration}
                    </h3>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </section>
        <section className="form-area">
          <Container>
            <div className="form-box">
              <Formik
                initialValues={{
                  username: "",
                  review: "",
                  rating: "",
                }}
                validate={validate}
                onSubmit={async (values, { resetForm }) => {
                //   console.log("Form Data", values);
                  try {
                    var params = props.location.search.slice(5);
                    const response = await postRequestForm(
                        `/api/movie/submit-review/${params}`,
                      "",
                      values
                    );
                    console.log("Add Review", response);
                    if (response.result.status === 200) {
                      console.log("Movie Review");
                      setIsSent("Movie Review Successfully!");
                      resetForm();
                      setTimeout(() => {
                        setIsSent(false);
                      }, 2000);
                      setIsrating(0);
                    }
                  } catch (error) {
                    console.log("Add Review error", error.message);
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <Row className="justify-content-center">
                      <Col lg={12} md={12} xs={12}>
                        <Row className="justify-content-center">
                          <Col lg={4} md={4} xs={12}>
                            {isSent ? (
                              <Alert className="text-center" variant="success">
                                {isSent}
                              </Alert>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12} md={12} xs={12}>
                        <h3 className="form-heading mt-3">Review Rating</h3>
                        {props.errors.rating ? (
                          <Alert
                            variant="danger"
                            className="ErrorMessage"
                            transition={true}
                          >
                            {props.errors.rating}
                          </Alert>
                        ) : null}
                        <StarRatings
                          rating={israting}
                          starRatedColor="blue"
                          changeRating={(newRating) => {
                            // console.log(newRating);
                            setIsrating(newRating);
                            props.values.rating = newRating;
                          }}
                          starRatedColor="#ffd700"
                          starHoverColor="#ffd700"
                          starDimension="30px"
                          starSpacing="5px"
                          numberOfStars={5}
                          name="rating"
                        />
                      </Col>
                      <Col lg={12} md={12} xs={12}>
                        <div className="form-group">
                          {props.errors.review ? (
                            <Alert
                              variant="danger"
                              className="ErrorMessage"
                              transition={true}
                            >
                              {props.errors.review}
                            </Alert>
                          ) : null}
                          <Field
                            className="form-control"
                            placeholder="What Do you say ?"
                            as="textarea"
                            rows={5}
                            id="review"
                            name="review"
                            onChange={props.handleChange}
                            value={props.values.review}
                          ></Field>
                        </div>
                      </Col>
                      <Col lg={12} md={12} xs={12}>
                        <div className="form-group">
                          {props.errors.username ? (
                            <Alert
                              variant="danger"
                              className="ErrorMessage"
                              transition={true}
                            >
                              {props.errors.username}
                            </Alert>
                          ) : null}
                          <Field
                            className="form-control wid"
                            placeholder="Username"
                            id="username"
                            name="username"
                            onChange={props.handleChange}
                            value={props.values.username}
                          ></Field>
                        </div>
                      </Col>

                      <Col
                        lg={12}
                        md={12}
                        xs={12}
                        className="d-flex justify-content-start"
                      >
                        {/* <div className="text-center"> */}
                        <InputField
                          element="button"
                          name=""
                          type=""
                          placeholder=""
                          className="btn-sign btn-rex"
                          btnType="submit"
                          btnText="Submit Review <i className='fa fa-arrow-right'></i>"
                        />
                        {/* </div> */}
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </div>
          </Container>
        </section>
        <section className="client-area">
          <Container>
            {reviews.map((postReviews,index) => (
              <div className="client-box" key={index}>
                <div className="card client-card">
                  <Row>
                    <Col lg="6" md="6" xs="12">
                      <h3 className="card-title">{postReviews.username}</h3>
                    </Col>
                    <Col lg="6" md="6" xs="12">
                      <p className="date-text">
                        {moment(postReviews.createdAt).format("Do MMMM")}
                      </p>
                    </Col>
                  </Row>
                  <Nav
                    className="star-nav justify-content-start client-rating"
                    as="ul"
                  >
                    {postReviews.rating === "1" ? (
                      <Nav.Item as="li">
                        <i className="fa fa-star"></i>
                      </Nav.Item>
                    ) : postReviews.rating === "2" ? (
                      <>
                        <Nav.Item as="li">
                          <i className="fa fa-star"></i>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <i className="fa fa-star"></i>
                        </Nav.Item>
                      </>
                    ) : postReviews.rating === "3" ? (
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
                    ) : postReviews.rating === "4" ? (
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
                    ) : postReviews.rating === "5" ? (
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
                  <p className="card-text">{postReviews.review}</p>
                </div>
              </div>
            ))}
          </Container>
        </section>
      </Layout>
    </>
  );
}

export default SingleMovie;
