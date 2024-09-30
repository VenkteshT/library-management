import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../src/contexts/AuthContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./contexts/CartContext.jsx";
import { BooksProvider } from "./contexts/BooksContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <BooksProvider>
            <App />
          </BooksProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
