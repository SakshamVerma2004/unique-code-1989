import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
let Login = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [admin,setAdmin]=useState(false);
  let {
    setSignupShow,
    setLoginShow,
    setLinksShow,
    signupShow,
    logniShow,
    linksShow,
    isLogin,
    setIsLogin,
    loginName,
    setLoginName,
    loginEmail,
    setLoginEmail
  } = useContext(AuthContext);
  let closeLogin = () => {
    setLoginShow(false);
    setLinksShow(true);
  };
  let SignupShowAndLoginClose = () => {
    setSignupShow(true);
    setLoginShow(false);
    setLinksShow(false);
  };

  let [usersData, setUsersData] = useState({});

  useEffect(() => {
    fetch("https://backend-server-8879b-default-rtdb.firebaseio.com/signup.json")
      .then((res) => res.json())
      .then((data) => setUsersData(Object.values(data)))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let loginHandler = (e) => {
    e.preventDefault();
    if (name === "Admin" && email === "admin@gmail.com") {
      const audio = new Audio(require("./boss2.mp3"));
      audio.play();
      swal("Hi Boss", "Time to Play", "success");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 3000);
      return;
    }
    if (name.trim().length === 0) {
      swal("Invalid Name", "Name length should not be 0", "error");
      return;
    }
    if (!email.includes("@")) {
      swal("Invalid Email", "Email Should contains @", "error");
      return;
    }
    if (email.trim().length === 0) {
      swal("Invalid Email length", "Email length should not be 0", "error");
      return;
    }

    let matchedUser = usersData.find(
      (user) => user.name === name && user.email === email
    );

    if (matchedUser) {
      setIsLogin(true);
      setLoginName(name);
      setLoginEmail(email);
      swal("Success", "Login Successful", "success");
      setLoginShow(false);
      setLinksShow(true);
      fetch("https://backend-server-8879b-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      swal(
        "Error",
        "Please Enter Correct Credentials or Create the account first",
        "error"
      );
      setIsLogin(false);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.cross}>
        <h1 className={styles.heading}>Login</h1>
        <p className={styles.cancel} onClick={closeLogin}>
          ⨯
        </p>
      </div>
      <form onSubmit={loginHandler}>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <hr></hr>
        <button className={styles.submit} type="submit">
          Submit
        </button>
      </form>
      <hr></hr>
      <div>
        <h3 className={styles.para}>
          New To QuickBite ?{" "}
          <Link className={styles.link} onClick={SignupShowAndLoginClose}>
            Create account
          </Link>{" "}
        </h3>
      </div>
    </div>
  );
};

export default Login;