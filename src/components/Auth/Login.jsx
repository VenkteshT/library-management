import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { auth as firebaseAuth, provider } from "../../services/firebase.js";
import { toast } from "react-toastify";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading.jsx";
export default function Login() {
  const { setUser, currentUser } = useContext(AuthContext);
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = () => {
    toast(`Login Succesfull`, {
      type: "success",
      autoClose: 1100,
    });
  };
  const handleEmailLogin = (e) => {
    setLoading(true);
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser({
          email,
        });
        notify();
        navigate("/");
      })
      .catch((err) => {
        setError(`email or password dosen't exist`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
        navigate("/");

        notify();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const gotoSignUp = () => {
    navigate("/signup");
  };
  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);
  return (
    <div className="container-sm border shadow-sm" id="login-container">
      {loading && (
        <div className="loader">
          <Loading />
        </div>
      )}
      <Form onSubmit={handleEmailLogin} className="w-100">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className=""
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
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
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
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
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Login
          </Button>
          <Button
            variant="danger"
            onClick={handleGoogleLogin}
            className="mt-3 w-100"
          >
            Continue with Google
          </Button>
        </div>
        <p className="mt-2 ms-2" onClick={gotoSignUp}>
          don't have account? <strong>SignUp</strong>
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
