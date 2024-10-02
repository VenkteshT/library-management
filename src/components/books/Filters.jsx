import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./filters.css";
const Filters = ({ filters, setFilters, applyFilter, clearFilter }) => {
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [isFiltersEmtpy, setIsFiltersEmpty] = useState(true);

  const handleChange = (e) => {
    setFilters((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    const { name } = e.target;

    if (name === "apply") {
      setIsFilterApplied(true);
      applyFilter();
    } else {
      setIsFilterApplied(false);
      clearFilter();
    }
  };

  useEffect(() => {
    let isEmpty = Object.entries(filters).every(([key, value]) => {
      if (key !== "sortBy" && key !== "sortOrder") return !value;
      return true;
    });
    setIsFiltersEmpty(isEmpty);
  }, [filters]);

  return (
    <div className="container mt-4">
      <Form className="mb-4" onSubmit={(e) => e.preventDefault()}>
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
          <Col md={3}>
            <div className="btns">
              <button
                disabled={isFiltersEmtpy}
                className="btn btn-primary filter-btn"
                onClick={handleClick}
                name="apply"
              >
                Apply
              </button>
              {isFilterApplied ? (
                <button
                  className="btn btn-danger filter-btn ms-2"
                  onClick={handleClick}
                  name="clear"
                >
                  Clear
                </button>
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
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
