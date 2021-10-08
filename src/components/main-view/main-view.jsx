import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
    };
  }
  
  getMovies() {
    axios
      .get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=Batman`, {
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data.Search,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getMovies();
  }

  logOut() {
    this.setState({
      user: null,
    });
    console.log("logout successful");
    alert("You have been successfully logged out");
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initally loaded
    const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div>
        <nav className="nav">

          <Button className="nav-item"
                  variant="secondary"
                  onClick={() => this.logOut()}
          >
            Logout
          </Button>
        </nav>
        <Router>
          <div className="main-view text-center container-fluid main-view-styles">
            <Navbar
              sticky="top"
              bg="light"
              expand="lg"
              className="mb-3 shadow-sm p-3 mb-5"
            >
              <Navbar.Brand href="http://localhost:1234" className="navbar-brand">
                My Fav Movies 
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                className="justify-content-end"
                id="basic-navbar-nav"
              >
                  <ul>
                    <Link to={`/`}>
                      <Button variant="link" onClick={() => this.logOut()}>
                        Sign Out
                      </Button>
                    </Link>
                    <Link to={`/users/${user}`}>
                      <Button variant="link">My Account</Button>
                    </Link>
                    <Link to={`/`}>
                      <Button variant="link">Movies</Button>
                    </Link>
                    <Link to={`/about`}>
                      <Button variant="link">About</Button>
                    </Link>
                  </ul>
              </Navbar.Collapse>
            </Navbar>

            <Route
              exact
              path="/"
              render={() => {
                return (
                  <div className="row d-flex mt-4 ml-2">
                    {movies.map((m) => (
                      <MovieCard key={m.imdbID} movie={m} />
                    ))}
                  </div>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match }) => (
                <MovieView
                  movie={movies.find((m) => m.imdbID === match.params.movieId)}
                  movieId={match.params.movieId}
                />
              )}
            />

            <Route
              path="/directors/:name"
              render={({ match }) => (
                <DirectorView
                  name={match.params.name}
                />
              )}
            /> 

          </div>
        </Router>
      </div>
    );
  }
}
