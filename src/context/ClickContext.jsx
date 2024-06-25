import { createContext, useState } from "react";

export const ClickContext = createContext({});

export function ClickContextProvider({ children }) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <ClickContext.Provider value={{ isOpenSearch, setIsOpenSearch }}>
      {children}
    </ClickContext.Provider>
  );
}
