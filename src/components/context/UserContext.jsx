"use client";

import { createContext, useState } from "react";
export const UserContext = createContext();
import jwt from "jsonwebtoken";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const loginUser = (token) => {
    setUser(token);
    // Set the session ID as an HTTP cookie with appropriate attributes
    document.cookie = `sessionID=${token}; path=/; secure; HttpOnly`;
  };
  const getUser = () => {
    try {
      const sessionID = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sessionID="))
        .split("=")[1];

      const decodedUser = jwt.verify(sessionID, "your-secret-key");
      return decodedUser;
    } catch (error) {
      return null;
    }
  };
  const signoutUser = () => {
    setUser("");
    document.cookie =
      "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; HttpOnly";
  };

  const userContextValue = {
    user,
    loginUser,
    signoutUser,
    getUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
