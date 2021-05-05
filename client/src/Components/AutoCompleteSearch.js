/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Input } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getRequest } from "../api/Helper";
import { useHistory } from "react-router-dom";

export default function AutoCompleteSearch() {
  const history = useHistory();

  const [top100Films, settop100Films] = useState([]);
  const getAllMovies = async () => {
    try {
      const response = await getRequest(`/api/movie/all-movies`, "");
      if (response.result.status === 200) {
        settop100Films([...top100Films, ...response.result.data.movies]);
      }
    } catch (error) {
      console.log("getAllMovies Error", error.message);
    }
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  return (
    <>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films}
        getOptionLabel={(option) => option.title}
        renderOption={(option) => (
          <React.Fragment>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.href = `/#/movie?_id=${option._id}`;
              }}
            >
              {option.title}
            </span>
            {/* <Link
              style={{ cursor: "pointer" }}
              onClick={() => {
                // window.location.href = `/movie?_id=${option._id}`;
                history.push(`/movie?_id=${option._id}`);
              }}
            to={`/movie?_id=${option._id}`}
            >
              {option.title}
            </Link> */}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <InputGroup className="mb-0">
            <TextField
              {...params}
              placeholder={`Search Movies...`}
              className={`form-control`}
            />
            <InputGroup.Append>
              <Button variant="" className={`p-0`}>
                <i className="fa fa-search"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        )}
      />
    </>
  );
}
