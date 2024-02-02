import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext("");

export const TaskContextProvider = ({ children }) => {
  const [tasklist, setTasklist] = useState([]);

  return (
    <TaskContext.Provider value={{ tasklist, setTasklist }}>
      {children}
    </TaskContext.Provider>
  );
};
