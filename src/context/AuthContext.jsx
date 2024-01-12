import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({});
  const values = { auth, setAuth };
  return (
    <AuthContext.Provider value={values}>{children} </AuthContext.Provider>
  );
}
