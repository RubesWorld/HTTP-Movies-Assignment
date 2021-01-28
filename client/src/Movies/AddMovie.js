import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
//MUI imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import e from "cors";
import axios from "axios";

const iniatialValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovie = (props) => {
  const { push } = useHistory();
  const [addMovie, setAddMovie] = useState(iniatialValues);
  const { id } = useParams();

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setAddMovie({
      ...addMovie,
      [name]: value,
    });
  };

  const movieSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`"/api/movies"`, addMovie)
      .then((res) => {
        props.setMovieList(res.data);
        push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
    setAddMovie(iniatialValues);
  };

  return (
    <div className="movie-card">
      <form onSubmit={movieSubmit}>
        <TextField
          fullWidth
          value={addMovie.title}
          onChange={handleChange}
          label="Title"
          name="title"
          size="medium"
          variant="outlined"
        />
        <TextField
          fullWidth
          value={addMovie.director}
          onChange={handleChange}
          label="Director"
          name="director"
          size="medium"
          variant="outlined"
        />
        <TextField
          fullWidth
          value={addMovie.metascore}
          onChange={handleChange}
          label="metascore"
          name="metascore"
          size="medium"
          variant="outlined"
        />
        <TextField
          fullWidth
          value={addMovie.stars}
          onChange={handleChange}
          label="Stars"
          name="stars"
          size="medium"
          variant="outlined"
        />
        <Button
          type="submit"
          color="secondary"
          type="submit"
          variant="contained"
        >
          {" "}
          Update Movie
        </Button>
      </form>
    </div>
  );
};

export default AddMovie;
