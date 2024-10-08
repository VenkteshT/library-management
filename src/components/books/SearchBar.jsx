import React, { useState, useEffect, useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { fetchBooks } from "../../services/bookService";
import "./searchbar.css";
import { BooksContext } from "../../contexts/BooksContext";
export default function SearchBar({ onSearch, clearResults }) {
  //
  let timerId;
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { books } = useContext(BooksContext);

  // function debounce(func, delay) {
  //   let timeoutId;
  //   return (...args) => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //     timeoutId = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // }

  // ------------- api having an issue with query params so implementing manual search functionality ---------

  // const getSuggestions = async (query) => {
  //   if (!query) {
  //     setSuggestions([]);
  //     return;
  //   }
  //   try {
  //     const data = await fetchBooks(query);
  //     setSuggestions(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // function debounce(callback, delay) {
  //   let timerId;
  //   return function (...arg) {
  //     if (timerId) clearTimeout(timerId);
  //     setTimeout(() => {
  //       callback.call(null, ...arg);
  //     }, delay);
  //   };
  // }
  // const debouncedSuggestion = debounce(getSuggestions, 300);
  // useEffect(() => {
  //   debouncedSuggestion(searchTerm);
  // }, [searchTerm]);

  // -----------------------------------------------------------------------------------------

  // useEffect(() => {
  //   getSuggestions(searchTerm);
  // }, [searchTerm]);

  const getSuggestions = (query) => {
    if (!query) {
      setSuggestions([]);
      clearResults();
      return;
    }
    setSuggestions(
      books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSelectSuggestion = (suggestion) => {
    setSuggestions([]);
    onSearch(suggestion.title);
    setSearchTerm(suggestion.title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSuggestions([]);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      getSuggestions(value);
    }, 350);
  };
  return (
    <Form onSubmit={handleSubmit} className="position-relative shadow-sm">
      <div className="input-group">
        <Form.Control
          type="text"
          placeholder="Search books by title, author, genre..."
          value={searchTerm}
          onChange={handleChange}
          required
        />
        {searchTerm && (
          <div
            className="clear input-group-text"
            onClick={() => {
              setSearchTerm("");
              setSuggestions([]);
              clearResults();
            }}
          >
            clear
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul
          className="suggestions list-group position-absolute w-100 mt-2"
          style={{ zIndex: 1000, overflowY: "scroll", height: "410px" }}
        >
          {suggestions.map((el) => {
            return (
              <li
                className="suggestions-item list-group-item"
                key={el.id}
                onClick={() => handleSelectSuggestion(el)}
              >
                {el.title} by {el.author || "Unknown Author"}
              </li>
            );
          })}
        </ul>
      )}
    </Form>
  );
}
