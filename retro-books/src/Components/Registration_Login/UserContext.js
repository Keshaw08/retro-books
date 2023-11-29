import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  const login = (userId) => {
    console.log("User logged in with ID:", userId);

    setUserId(userId);
  };
  console.log("Current userId:", userId);
  return (
    <UserContext.Provider value={{ userId, login }}>
      {children}
    </UserContext.Provider>
  );
}
