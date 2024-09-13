import React from 'react';
import './MyPlates.scss'; 
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Pagination } from 'react-bootstrap';

const MyPlates = ({ recipes }) => {
  const navigate = useNavigate();

  return (
    <Container className="my-plates-container">
      <div className="header">
        <h2>My Plates</h2>
        <div className="header-actions">
          <Button variant="outline-primary" onClick={() => navigate('/explore')}>
            Explore More Recipes
          </Button>
          <Button variant="outline-success" onClick={() => navigate('/create')}>
            Create My Plate
          </Button>
        </div>
      </div>

      <Row className="recipe-cards">
        {recipes.map((recipe, index) => (
          <Col md={3} key={index} className="recipe-card">
            <Card>
              <Card.Img variant="top" src={recipe.imageUrl} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="pagination-controls">
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{67}</Pagination.Item>
        <Pagination.Item>{68}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </Container>
  );
};

export default MyPlates;
