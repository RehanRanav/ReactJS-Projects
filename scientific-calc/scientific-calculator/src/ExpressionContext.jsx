import { createContext, useState } from "react";

export const ExpressionContext = createContext("");

export const ExpressionContextProvider = ({ children }) => {
  const [expression, setExpression] = useState("");
  return (
    <ExpressionContext.Provider value={{ expression, setExpression }}>
      {children}
    </ExpressionContext.Provider>
  );
};
