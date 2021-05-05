import { useState, useEffect } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { getRequest } from "../api/Helper";
import Layout from "../Components/Layout";
import Movie from "../Components/Movie";
import Pagination from "../Components/Pagination";

function HomePage(props) {
  const [movies, setMovies] = useState([]);
  const [moviePerPage] = useState(5);
  let [skip, setSkip] = useState(0);
  // const [isFetching, setIsFetching] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  // let skip;

  const getAllMovies = async () => {
    try {
      const response = await getRequest(`/api/movie/getAllMovies`, "", {
        _skip: skip,
        _limit: moviePerPage,
      });
      if (response.result.status === 200) {
        setMovies([...movies, ...response.result.data.filteredArray]);
      }
    } catch (error) {
      console.log("getAllMovies Error", error.message);
    }
  };
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
    var trackLength = document.body.offsetHeight - windowDimensions.height;
    if (Math.floor((window.pageYOffset / trackLength) * 100) == 70) {
      getAllMovies();
      setSkip(skip + moviePerPage);
      setIsFetching(true);
    }
  };
  useEffect(() => {
    getAllMovies();
    window.addEventListener("scroll", handleResize);
    return () => window.removeEventListener("scroll", handleResize);
  }, [skip]);
  

  return (
    <>
      <Layout>
        <section className="movie-area">
          <Container>
            <Movie posts={movies} />
            {
              isFetching||movies.length == 0?<h1 className="text-center text-light mb-5">Loading...</h1>:''
            }
          </Container>
        </section>
      </Layout>
    </>
  );
}

export default HomePage;
