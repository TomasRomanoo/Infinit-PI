"use client";

import { createContext, useState } from "react";
import jwt from "jsonwebtoken";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const loginUser = (token) => {
    setUser(token);
  };
  
  const getUser = (token) => {
    try {
      const decodedUser = jwt.decode(token);
      return decodedUser;
    } catch (error) {
      console.error("Error decoding token:", error);
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
