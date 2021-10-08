import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card } from 'react-bootstrap';
import './director-view.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {
        directorId: null,
        director: null,
    };
  }

  componentDidMount() {
      const directorName = this.props.name;

      axios
      .get(`https://api.watchmode.com/v1/search?apiKey=${process.env.WATCHMODE_API_KEY}&search_field=name&search_value=${directorName}`, {
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          director: response.data.people_results[0],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { director } = this.state;

    if (!director) return null;

    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Col className="col-3" />
          <div className="director-view container-fluid align-items-center col-6">
            <div className="director-id">
              <span className="label">imdb Id: </span>
              <span className="value">{director.imdb_id}</span>
            </div>
            <div className="director-profession">
              <span className="label">Profession: </span>
              <span className="value">{director.main_profession}</span>
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

DirectorView.propTypes = {
    director: PropTypes.shape({
        id: PropTypes.number,
        imdb_id: PropTypes.string,
        main_profession: PropTypes.string,
        name: PropTypes.string,
        resultType: PropTypes.string,
        tmdb_id: PropTypes.number,
    })
}