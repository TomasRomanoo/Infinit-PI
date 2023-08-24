"use client";

import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //* Lo mande con use effect pq en la consola me tiraba
  //* error si lo inicializaba con el localStorage (pero funcionaba)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = JSON.parse(localStorage.getItem("token"));
      setUser(token);
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("token",JSON.stringify(token));
    setUser(token);
    getUser();
    console.log("User",user)
  };
  
  const getUser = () => {
    try {
      const decodedUser = jwt.decode(user);
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
