import React, { createContext, useState } from "react";

// Create a context
export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [data, setData] = useState("Hello, World!");

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
