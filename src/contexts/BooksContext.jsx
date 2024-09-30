import React, { createContext, useState } from "react";

// since the dummy book api having an issue with search param so i'm managaing the book state globaly to perform filtering manually
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
