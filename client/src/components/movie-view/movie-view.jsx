import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = null;
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <Row>
          <Col><img className="movie-poster" src={movie.ImagePath} /></Col>
        </Row>
        <Row>
          <Col>{movie.Title}</Col>
        </Row>
        <Row>
          <Col>{movie.moviegenredetails.map(g => g.Name).join(', ')}</Col>
          <Col>{movie.moviedirectordetails.map(d => d.Name).join(', ')}</Col>
        </Row>
        <Row>
          <Col>{movie.Description} </Col>
        </Row>

        <Button onClick={() => onClick()} variant="primary">Back</Button>
      </Container>

    );
  }
}