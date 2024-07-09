import React, { createContext, useContext, useState } from "react";

const ActiveUserContext = createContext();
export const useActiveUserContext = () => {
  return useContext(ActiveUserContext);
};
export const ActiveUserProvider = ({ children }) => {
  const [activeUserIndex, setActiveUserIndex] = useState(0);
  return (
    <ActiveUserContext.Provider value={{ activeUserIndex, setActiveUserIndex }}>
      {children}
    </ActiveUserContext.Provider>
  );
};

export const useActiveUser = () => useContext(ActiveUserContext);
