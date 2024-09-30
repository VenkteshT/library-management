import React, { createContext, useState } from "react";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const handleUpdateBooks = (items) => {
    setBooks(items);
  };
  return (
    <BooksContext.Provider value={{ books, handleUpdateBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
