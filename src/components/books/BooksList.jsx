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
  const [loading, setLoading] = useState(false);
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

  const resetFilter = () => {
    setFilters({
      title: "",
      author: "",
      genre: "",
      publication_year: "",
      sortBy: "",
      sortOrder: "asc",
    });
  };

  const loadBooks = async () => {
    setLoading(true);
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
      const enhancedBooks = fetchedBooks.map((book) => {
        let availability = Math.random() > 0.3;
        return {
          ...book,
          availability,
          copies: !availability ? 0 : Math.floor(Math.random() * 5) + 1,
        };
      });

      handleUpdateBooks(enhancedBooks);
      if (enhancedBooks.length === 0 || books.length >= data.numFound) {
        setHasMore(false);
      }
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const applyFilter = () => {
    loadBooks();
  };

  const clearFilter = () => {
    resetFilter();
  };

  useEffect(() => {
    let isEmpty = Object.entries(filters).every(([key, value]) => {
      if (key !== "sortBy" && key !== "sortOrder") return !value;
      return true;
    });

    if (isEmpty) {
      loadBooks();
    }
  }, [filters]);

  return (
    <Container>
      <SearchBar
        onSearch={handleSearch}
        clearResults={clearResults}
        clearFilter={clearFilter}
      />
      <Filters
        filters={filters}
        setFilters={setFilters}
        applyFilter={applyFilter}
        clearFilter={clearFilter}
      />
      <div className="mb-2 mt-4">
        <h5>Total Books Found: {loading ? "loading..." : allBooks.length}</h5>
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
                <Card className="shadow-sm border-success">
                  <Card.Body>
                    <div className="bg-success text-white p-2 rounded">
                      <Card.Title className="text-truncate">
                        {book.title}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {book.author}
                      </Card.Subtitle>
                    </div>
                    <Card.Text className="mt-4 ps-1">
                      <span className="text-muted">Subject:&nbsp;</span>
                      {book.description || "N/A"}
                      <br />
                      <span className="text-muted">Published:&nbsp;</span>{" "}
                      {book.publication_year || "N/A"}
                      <br />
                      <Card.Text>
                        <Card.Text className="m-0">
                          <span className="text-muted">Genre:&nbsp;</span>
                          {book?.genre.map((el, i, arr) => {
                            return (
                              <span key={i}>
                                {i == arr.length - 1 ? el : el + " ,"}
                              </span>
                            );
                          })}
                        </Card.Text>
                        <span className="text-muted">Availability:&nbsp;</span>
                        {book.availability ? "Available" : "Unavailable"}
                        <br />
                        <span className="text-muted">Copies:&nbsp;</span>
                        {book.copies}
                      </Card.Text>
                    </Card.Text>
                    {/* Add buttons for adding to cart, etc. */}
                    <Button
                      disabled={!book.availability}
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
