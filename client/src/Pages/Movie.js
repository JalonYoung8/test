import { Field, Form, Formik } from "formik";
import { Container, Alert, Row, Col } from "react-bootstrap";
import InputField from "../Components/InputField";
import Layout from "../Components/Layout";
// import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import { postRequestForm } from "../api/Helper";
import { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";

function Movie(props) {
  const history = useHistory();
  const [isSent, setIsSent] = useState(false);
  const [isRating, setIsRating] = useState(0);

  const [isReviewRating, setIsReviewRating] = useState(0);
  if (localStorage.getItem("TOKEN")) {
  } else {
    var pathName = window.location.pathname;
    if (pathName === "/add_movie") {
      history.push("/");
    }
  }
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is Required";
    }
    if (!values.Cast_1) {
      errors.Cast_1 = "Cast 1 is Required";
    }
    if (!values.duration) {
      errors.duration = "Duration is Required";
    }
    if (!values.release_year) {
      errors.release_year = "Release Year is Required";
    }
    if (!values.Cast_2) {
      errors.Cast_2 = "Cast 2 is Required";
    }
    if (!values.rating) {
      errors.rating = "Rating is Required";
    }
    if (!values.Cast_3) {
      errors.Cast_3 = "Cast 3 is Required";
    }

    return errors;
  };
  return (
    <>
      <Layout>
        <section className="add-area">
          <Container>
            <h1 className="add-heading">Add Movie</h1>
            <Formik
              initialValues={{
                title: "",
                Cast_1: "",
                duration: "",
                release_year: "",
                Cast_2: "",
                rating: "",
                Cast_3: "",
                reviewComment: "",
                reviewRating: "",
              }}
              validate={validate}
              onSubmit={async (
                values,
                {
                  setSubmitting,
                  setErrors,
                  resetForm /* setValues and other goodies */,
                }
              ) => {
                const cast = `${values.Cast_1},${values.Cast_2},${values.Cast_3}`;
                const token = localStorage.getItem("TOKEN");
                const APIresponse = {
                  title: values.title,
                  duration: values.duration,
                  release_year: values.release_year,
                  rating: `${values.rating}`,
                  cast,
                  review: {
                    comment: values.reviewComment,
                    rating: `${values.reviewRating}`,
                  },
                };
                console.log("Form Data API", APIresponse);
                try {
                  const response = await postRequestForm(
                    "/api/admin/add-movie",
                    token,
                    APIresponse
                  );
                  console.log("Add Movie", response);
                  // console.log("status", response.result.status);
                  if (response.result.status === 200) {
                    console.log("Movie Added");
                    setIsSent("Movie Added Successfully!");
                    resetForm();
                    setTimeout(() => {
                      setIsSent(false);
                    }, 2000);
                    setIsRating(0);
                    setIsReviewRating(0);
                  }
                } catch (error) {
                  console.log("Add Movie error", error.message);
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
                    <Col lg={4} md={4} xs={12}>
                      {props.errors.title ? (
                        <Alert
                          variant="danger"
                          className="ErrorMessage"
                          transition={true}
                        >
                          {props.errors.title}
                        </Alert>
                      ) : null}
                      <InputField
                        element="input"
                        name="title"
                        type="text"
                        placeholder="Movie Name"
                        className=""
                        onChange={props.handleChange}
                        value={props.values.title}
                      />
                    </Col>
                    <Col lg={4} md={4} xs={12}>
                      {props.errors.Cast_1 ? (
                        <Alert
                          variant="danger"
                          className="ErrorMessage"
                          transition={true}
                        >
                          {props.errors.Cast_1}
                        </Alert>
                      ) : null}
                      <InputField
                        element="input"
                        name="Cast_1"
                        type="text"
                        placeholder="Cast 1"
                        className=""
                        onChange={props.handleChange}
                        value={props.values.Cast_1}
                      />
                    </Col>
                    <Col lg={4} md={4} xs={12}>
                      {props.errors.duration ? (
                        <Alert
                          variant="danger"
                          className="ErrorMessage"
                          transition={true}
                        >
                          {props.errors.duration}
                        </Alert>
                      ) : null}
                      <InputField
                        element="input"
                        name="duration"
                        type="text"
                        placeholder="Time To Watch"
                        className=""
                        onChange={props.handleChange}
                        value={props.values.duration}
                      />
                    </Col>
                    <Col lg={4} md={4} xs={12}>
                      {props.errors.release_year ? (
                        <Alert
                          variant="danger"
                          className="ErrorMessage"
                          transition={true}
                        >
                          {props.errors.release_year}
                        </Alert>
                      ) : null}
                      <InputField
                        element="input"
                        name="release_year"
                        type="text"
                        placeholder="Year Release"
                        className=""
                        onChange={props.handleChange}
                        value={props.values.release_year}
                      />
                    </Col>
                    <Col lg={4} md={4} xs={12}>
                      {props.errors.Cast_2 ? (
                        <Alert
                          variant="danger"
                          className="ErrorMessage"
                          transition={true}
                        >
                          {props.errors.Cast_2}
                        </Alert>
                      ) : null}
                      <InputField
                        element="input"
                        name="Cast_2"
                        type="text"
                        placeholder="Cast 2"
                        className=""
                        onChange={props.handleChange}
                        value={props.values.Cast_2}
                      />
                    </Col>
                    <Col lg={4} md={4} xs={12} className="align-self-center">
                      <h3 className="form-heading">Rating</h3>
                      {/* <ReactStars
                        count={5}
                        // onChange={props.handleChange}
                        onChange={(newRating) => {
                          // console.log(newRating);
                          props.values.rating = newRating;
                        }}
                        edit={undefined}
                        value={isRating}
                        size={34}
                        // isHalf={true}
                        emptyIcon={<i className="fa fa-star-o"></i>}
                        // halfIcon={<i className="fa fa-star-half-o"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      /> */}
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
                        rating={isRating}
                        starRatedColor="blue"
                        changeRating={(newRating) => {
                          // console.log(newRating);
                          setIsRating(newRating);
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
                    <Col lg={4} md={4} xs={12}>
                      {props.errors.Cast_3 ? (
                        <Alert
                          variant="danger"
                          className="ErrorMessage"
                          transition={true}
                        >
                          {props.errors.Cast_3}
                        </Alert>
                      ) : null}
                      <InputField
                        element="input"
                        name="Cast_3"
                        type="text"
                        placeholder="Cast 3"
                        className=""
                        onChange={props.handleChange}
                        value={props.values.Cast_3}
                      />
                    </Col>
                    <Col lg={12} md={12} xs={12}>
                      <hr style={{ borderColor: "#dddddd" }} />
                    </Col>

                    <Col lg={12} md={12} xs={12}>
                      <Row>
                        <Col lg={8} md={12} xs={12}>
                          <Field
                            className="form-control"
                            placeholder="Review Comment"
                            as="textarea"
                            id="reviewComment"
                            name="reviewComment"
                            onChange={props.handleChange}
                            value={props.values.reviewComment}
                          ></Field>
                        </Col>
                        <Col lg={4} md={12} xs={12}>
                          <h3 className="form-heading mt-3">Review Rating</h3>
                          <StarRatings
                            rating={isReviewRating}
                            starRatedColor="blue"
                            changeRating={(newRating) => {
                              // console.log(newRating);
                              setIsReviewRating(newRating);
                              props.values.reviewRating = newRating;
                            }}
                            starRatedColor="#ffd700"
                            starHoverColor="#ffd700"
                            starDimension="30px"
                            starSpacing="5px"
                            numberOfStars={5}
                            name="reviewRating"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={12} xs={12}>
                      <div className="text-center">
                        <InputField
                          element="button"
                          name=""
                          type=""
                          placeholder=""
                          className=""
                          btnType="submit"
                          btnText="<i class='fa fa-arrow-right'></i>"
                        />
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export default Movie;
