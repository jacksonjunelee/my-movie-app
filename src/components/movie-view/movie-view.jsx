import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card } from 'react-bootstrap';
import './movie-view.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
        movieId: null,
        movie: {}
    };
  }

  componentDidMount() {
      const movieId = this.props.movieId;

      axios
      .get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`, {
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movie: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.state;

    if (!movie) return null;

    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Col className="col-3" />
          <div className="movie-view container-fluid align-items-center col-6">
            <img className="movie-poster" src={movie.Poster} />
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Plot: </span>
              <span className="value">{movie.Plot}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre}`}>
                <Button variant="link">{movie.Genre}</Button>
              </Link>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director}`}>
                <Button variant="link">{movie.Director}</Button>
              </Link>
            </div>

            <Link to={`/`}>
              <Button variant="link">Return</Button>
            </Link>
          </div>
          <Col className="col-3" />
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Rated: PropTypes.string,
    Released: PropTypes.string,
    Runtime: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Writer: PropTypes.string.isRequired,
    Actors: PropTypes.string.isRequired,
    Plot: PropTypes.string.isRequired,
    Language: PropTypes.string.isRequired,
    Country: PropTypes.string.isRequired,
    Awards: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
    Ratings: PropTypes.arrayOf(PropTypes.shape({
        Source: PropTypes.string.isRequired,
        Value: PropTypes.number.isRequired,
      })).isRequired,
    Metascore: PropTypes.string.isRequired,
    imdbRating: PropTypes.string.isRequired,
    imdbVotes: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    DVD: PropTypes.string.isRequired,
    BoxOffice: PropTypes.string.isRequired,
    Production: PropTypes.string.isRequired,
    Website: PropTypes.string.isRequired,
    Response: PropTypes.string.isRequired,
})};