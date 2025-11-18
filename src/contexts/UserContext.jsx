import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const saveUser = (userData) => {
    setUser(userData);
    setUserId(userData?.id || null);
  };

  const clearUser = () => {
    setUser(null);
    setUserId(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userId,
        saveUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

