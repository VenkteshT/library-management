import React, { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import { ListGroup, Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, []);

  const handleCheckout = () => {
    cart.forEach((book) => {
      // Update book copies
      book.copies -= 1;
      if (book.copies === 0) {
        book.availability = false;
      }
    });
    clearCart();
    toast("Checkout successful!", { type: "info", autoClose: 1100 });
  };

  return (
    <div>
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>No books in cart.</p>
      ) : (
        <ListGroup>
          {cart.map((book, index) => (
            <ListGroup.Item key={index}>
              {book.title} by {book.author ? book.author : "Unknown Author"}
              <Button
                variant="danger"
                size="sm"
                className="float-end"
                onClick={() => removeFromCart(book.id)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {cart.length > 0 && (
        <Button variant="primary" className="mt-3" onClick={handleCheckout}>
          Checkout
        </Button>
      )}
    </div>
  );
};

export default Cart;
