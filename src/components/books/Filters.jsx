// src/components/Books/Filters.js
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="filterTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={filters.title}
                onChange={handleChange}
                placeholder="Filter by Title"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="filterAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={filters.author}
                onChange={handleChange}
                placeholder="Filter by Author"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="filterSubject">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={filters.genre}
                onChange={handleChange}
                placeholder="Filter by Genre"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="filterPublishDate">
              <Form.Label>Publish Date</Form.Label>
              <Form.Control
                type="number"
                name="publication_year"
                value={filters.publication_year}
                onChange={handleChange}
                placeholder="Filter by Year"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={3}>
            <Form.Group controlId="sortBy">
              <Form.Label>Sort By</Form.Label>
              <Form.Control as="select" name="sortBy" onChange={handleChange}>
                <option value="">Select</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="publishDate">Publish Date</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="sortOrder">
              <Form.Label>Order</Form.Label>
              <Form.Control
                as="select"
                name="sortOrder"
                onChange={handleChange}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filters;
