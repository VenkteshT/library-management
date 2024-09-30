import React, { useState, useEffect, useContext } from "react";
import { fetchBooks } from "../../services/bookService";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Loading from "../Common/Loading.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "./SearchBar.jsx";
import Filters from "./Filters.jsx";
import { CartContext } from "../../contexts/CartContext.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../../contexts/BooksContext.jsx";
const BooksList = () => {
  const { addToCart, cart, removeFromCart } = useContext(CartContext);
  const { books, handleUpdateBooks } = useContext(BooksContext);
  const { currentUser } = useContext(AuthContext);
  const [allBooks, setAllBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [totalBooks, setTotalBooks] = useState(0);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    genre: "",
    publication_year: "",
    sortBy: "",
    sortOrder: "asc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  const loadBooks = async () => {
    try {
      const data = await fetchBooks("");
      let fetchedBooks = data;

      setTotalBooks(data && data.length);
      // Apply filters
      if (filters.title) {
        fetchedBooks = fetchedBooks.filter((book) =>
          book.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
      if (filters.author) {
        fetchedBooks = fetchedBooks.filter(
          (book) =>
            book.author &&
            book.author.toLowerCase().includes(filters.author.toLowerCase())
        );
      }
      if (filters.genre) {
        fetchedBooks = fetchedBooks.filter((book) => {
          return book?.genre.find((el) =>
            el.toLowerCase().includes(filters.genre.toLowerCase())
          );
        });
      }
      if (filters.publication_year) {
        fetchedBooks = fetchedBooks.filter(
          (book) => book.publication_year === parseInt(filters.publication_year)
        );
      }

      // Apply sorting
      if (filters.sortBy) {
        fetchedBooks.sort((a, b) => {
          let fieldA = a[filters.sortBy];
          let fieldB = b[filters.sortBy];
          if (Array.isArray(fieldA)) fieldA = fieldA[0];
          if (Array.isArray(fieldB)) fieldB = fieldB[0];
          if (fieldA < fieldB) return filters.sortOrder === "asc" ? -1 : 1;
          if (fieldA > fieldB) return filters.sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      }

      // Enhance books with availability
      const enhancedBooks = fetchedBooks.map((book) => ({
        ...book,
        availability: Math.random() > 0.3,
        copies: 10,
      }));

      handleUpdateBooks(enhancedBooks);
      if (enhancedBooks.length === 0 || books.length >= data.numFound) {
        setHasMore(false);
      }
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const bookInCart = (id) => {
    return cart.find((book) => book.id === id);
  };

  const clearResults = () => {
    setAllBooks([...books]);
  };

  const handleSearch = (item) => {
    setSearch(item);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    setAllBooks([...books]);
  }, [books]);

  useEffect(() => {
    setAllBooks(
      books.filter((el) =>
        el.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    loadBooks();
  }, [filters]);
  return (
    <Container>
      <SearchBar onSearch={handleSearch} clearResults={clearResults} />
      <Filters filters={filters} setFilters={setFilters} />
      <div className="mb-2 mt-4">
        <h5>Total Books Found: {allBooks.length}</h5>
      </div>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={books.length}
        next={loadBooks}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<p style={{ textAlign: "center" }}>No more books </p>}
      >
        <Row>
          {allBooks.map((book) => {
            const isAdded = bookInCart(book.id);
            return (
              <Col key={book.id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author}
                    </Card.Subtitle>
                    <Card.Text>
                      Subject: {book.description || "N/A"}
                      <br />
                      Published: {book.publication_year || "N/A"}
                      <br />
                      <Card.Text>
                        <Card.Text>
                          Genre:
                          {book?.genre.map((el, i, arr) => {
                            return (
                              <span key={i}>
                                {i == arr.length - 1 ? el : el + " ,"}
                              </span>
                            );
                          })}
                        </Card.Text>
                        Availability:{" "}
                        {book.availability ? "Available" : "Unavailable"}
                        <br />
                        Copies: {book.copies}
                      </Card.Text>
                    </Card.Text>
                    {/* Add buttons for adding to cart, etc. */}
                    <Button
                      variant={`${isAdded ? "danger" : "success"}`}
                      onClick={() =>
                        !isAdded ? addToCart(book) : removeFromCart(book.id)
                      }
                    >
                      {isAdded ? "Remove" : "Add to Cart"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </InfiniteScroll>
    </Container>
  );
};

export default BooksList;
