import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "./contexts/AuthContext.jsx";
import BooksList from "./components/books/BooksList.jsx";
import { auth } from "./services/firebase.js";
import Cart from "./components/Cart/Cart.jsx";
import { Container, Navbar, Nav } from "react-bootstrap";
import Signup from "./components/Auth/SignUp.jsx";
import { CartContext } from "./contexts/CartContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Common/Loading.jsx";
function App() {
  const { currentUser, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  useEffect(() => {}, []);
  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
        toast("Logout Succesfully", { type: "success", autoClose: 1100 });
      });
  };
  return (
    <div className="px-2">
      <ToastContainer />
      {loading && (
        <div className="loader">
          <Loading />
        </div>
      )}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Library Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4">
            <Nav.Link as={Link} to="/">
              Books
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" style={{ position: "relative" }}>
              Cart {currentUser && <span className="count">{cart.length}</span>}
            </Nav.Link>
          </Nav>
          <Nav className="ms-4">
            {currentUser ? (
              <Nav.Link onClick={handleSignOut}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
