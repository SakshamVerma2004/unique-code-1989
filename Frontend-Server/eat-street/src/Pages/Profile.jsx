import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { AuthContext } from "../Context/AuthContextProvider";

let Profile = () => {
  let [enteredName, setEnteredName] = useState("");
  let [enteredEmail, setEnteredEmail] = useState("");
  let {loginName,setLoginName,loginEmail,setLoginEmail} = useContext(AuthContext);
  useEffect(() => {
    fetch("https://backend-server-unique-code-default-rtdb.firebaseio.com/users.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.main}>
      <h3 className={styles.heading}>Your Profile</h3>
      <div className={styles.nameDiv}>
        <h5 className={styles.name}>Your Name :</h5>
        <h5 className={styles.enteredName}>{loginName}</h5>
      </div>
      <div className={styles.emailDiv}>
        <h5 className={styles.email}>Your Email :</h5>
        <h5 className={styles.enteredEmail}>{loginEmail}</h5>
      </div>
    </div>
  );
};

export default Profile;