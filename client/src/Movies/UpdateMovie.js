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

const UpdateMovie = (props) => {
  const { push } = useHistory();
  const [movies, setMovies] = useState(iniatialValues);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setMovies({
      ...movies,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movies)
      .then((res) => {
        props.setMovieList(res.data);
        push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
    setMovies(iniatialValues);
  };

  return (
    <div className="movie-card">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={movies.title}
          onChange={handleChange}
          label="Title"
          name="title"
          size="medium"
          variant="outlined"
        />
        <TextField
          fullWidth
          value={movies.director}
          onChange={handleChange}
          label="Director"
          name="director"
          size="medium"
          variant="outlined"
        />
        <TextField
          fullWidth
          value={movies.metascore}
          onChange={handleChange}
          label="metascore"
          name="metascore"
          size="medium"
          variant="outlined"
        />
        <TextField
          fullWidth
          value={movies.stars}
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

export default UpdateMovie;
