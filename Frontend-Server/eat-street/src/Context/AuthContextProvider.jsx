import { createContext, useState,useEffect } from "react";
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
  let [qty,setQty]=useState(1);
  let [btndis,setBtnDis]=useState(false);
  let [cartItems,setCartItems]=useState([]);
  let [removed,setRemoved]=useState(false);
  let [filterlength,setFilterlength]=useState(1);
  let [addedItem,setAddedItem]=useState(false);
  let [showCartItems,setShowCartItems]=useState(false);
  let logout = () => {
    setIsLogin(false);
  };
  setTimeout(() => {
    setRemoved(true);
  }, 900000);
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
        setTotal,
        qty,
        setQty,
        cartItems,
        setCartItems,
        btndis,
        setBtnDis,
        removed,
        setRemoved,
        filterlength,
        setFilterlength,
        addedItem,
        setAddedItem,
        showCartItems,
        setShowCartItems
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
