import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext();
const userEng = JSON.parse(localStorage.getItem('userEng'))||{};
const tokenEng = JSON.parse(localStorage.getItem('tokenEng'))||'';
const authEng = userEng.name === undefined ? false : true
function AuthContextProvider({ children }) {
  const [isAuth,setIsAuth] = useState(authEng);
  const [user , setUser] = useState(userEng);
  const [token , setToken] = useState(tokenEng)


  const logout = ()=>{
     setIsAuth(false);
     setUser({});
     setToken('')
     localStorage.removeItem('userEng')
     localStorage.removeItem('tokenEng')
  }
 
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth , user , setUser , logout , token , setToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;