import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { auth as firebaseAuth, provider } from "../../services/firebase.js";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading.jsx";
export default function Signup() {
  const { setUser, currentUser } = useContext(AuthContext);
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEmailSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        navigate("/");
      })
      .catch((err) => {
        setError(`email or password dosen't exist`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const gotoSignin = () => {
    navigate("/login");
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);
  return (
    <div className="container-sm shadow-sm border" id="login-container">
      {loading && (
        <div className="loader">
          <Loading />
        </div>
      )}
      <Form onSubmit={handleEmailSignup} className="w-100">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="primary"
            type="submit"
            className="mt-3 w-100 fw-normal"
          >
            SignUp
          </Button>
          <Button
            variant="danger"
            onClick={handleGoogleLogin}
            className="mt-3 w-100 fs-6"
          >
            Continue with Google
          </Button>
        </div>
        <p className="mt-2 ms-2" onClick={gotoSignin}>
          already have account? <strong>Sign-in</strong>
        </p>
        {error && (
          <p className="ms-2" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </Form>
    </div>
  );
}
