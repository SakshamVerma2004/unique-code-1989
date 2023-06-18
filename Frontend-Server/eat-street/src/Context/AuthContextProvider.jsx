import { createContext, useState } from "react";
export let AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  let [signupShow, setSignupShow] = useState(false);
  let [loginShow, setLoginShow] = useState(false);
  let [linksShow, setLinksShow] = useState(true);
  let [signupName, setSignupName] = useState("");
  let [signupEmail, setSignupEmail] = useState("");
  let [isLogin, setIsLogin] = useState(false);
  let [loginName, setLoginName] = useState("");
  let [loginEmail, setLoginEmail] = useState("");
  let [city, setCity] = useState("");
  let [item, setItem] = useState("");
  let [time, setTime] = useState("");
  let [total,setTotal]=useState(0);
  let logout = () => {
    setIsLogin(false);
  };
  setTimeout(() => {
    if (isLogin) {
      setIsLogin(false);
    }
  }, 1800000);
  return (
    <AuthContext.Provider
      value={{
        setSignupShow,
        setLoginShow,
        setLinksShow,
        signupName,
        setSignupName,
        signupShow,
        loginShow,
        linksShow,
        signupEmail,
        setSignupEmail,
        isLogin,
        setIsLogin,
        loginName,
        setLoginName,
        logout,
        loginEmail,
        setLoginEmail,
        city,
        setCity,
        item,
        setItem,
        time,
        setTime,
        total,
        setTotal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
