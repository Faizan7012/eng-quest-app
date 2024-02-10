import React, { useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = React.createContext();
let userEng = JSON.parse(localStorage.getItem('userEng'))||{};
function AuthContextProvider({ children }) {

  const tokenEng = Cookies.get('tokenEng')||'';
  const authEng = tokenEng ? true : false;
  const [isAuth,setIsAuth] = useState(authEng);
  const [user , setUser] = useState(userEng);
  const [token , setToken] = useState(tokenEng)

  const logout = ()=>{
     setIsAuth(false);
     setUser({});
     setToken('')
      Cookies.remove('tokenEng')
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth , user , setUser , logout , token , setToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;