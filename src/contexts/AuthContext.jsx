import React, { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setUser = (user) => {
    setCurrentUser(user);
  };
  return (
    <AuthContext.Provider value={{ currentUser, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
