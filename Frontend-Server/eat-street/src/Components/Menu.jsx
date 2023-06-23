import { useSearchParams } from "react-router-dom";
import styles from "./Menu.module.css";
import swal from "sweetalert";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

let Menu = ({
  best,
  chef,
  desc,
  image,
  must,
  name,
  price,
  ratings,
  spicy,
  veg,
  votes,
}) => {
  let [alert, setAlert] = useState(false);
  let [cart, setCart] = useState(false);
  let [dis, setDis] = useState(false);
  let { item, setItem, loginName, setLoginName, time, loginEmail, qty, setQty } = useContext(AuthContext);
  
  useEffect(() => {
    const handleResize = () => {
      setDis(window.innerWidth < 413);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let alertHandler = () => {
    setAlert(true);
    setItem(name);

    fetch("https://backend-server-8879b-default-rtdb.firebaseio.com/extra.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        name,
        price,
        desc,
        time,
        loginName,
        loginEmail,
        qty
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setCart(true);
  };

  if (alert) {
    swal(item, "Item added to Cart", "success");
  }

  const nameStyle = {
    fontSize: dis ? "10px" : ""
  };

  return (
    <div className={styles.main}>
      <div className={styles.imgDiv}>
        <img src={image} alt="menu-item-image" className={styles.image} />
      </div>
      <div className={styles.descDiv}>
        <h2 className={styles.name} style={nameStyle}>
          {name}{" "}
          {veg === "yes" ? (
            <img
              src="https://clipground.com/images/veg-logo-png-6.png"
              alt="veg-image"
              className={styles.vegImage}
            />
          ) : (
            <img
              src="https://th.bing.com/th/id/OIP.w6vZA1LU2oGl4vbu1Q2BxQHaH0?pid=ImgDet&rs=1"
              alt="non-veg-image"
              className={styles.nonVegImage}
            />
          )}
          <div className={styles.options}>
            {best === "yes" ? <button className={styles.best}>Best Seller</button> : ""}
            {chef === "yes" ? <button className={styles.chef}>Chef Special</button> : ""}
            {must === "yes" ? <button className={styles.must}>Must Try</button> : ""}
            {spicy === "yes" ? <button className={styles.spicy}>Spicy</button> : ""}
          </div>
        </h2>
        <p className={styles.ratings}>
          Ratings: <span className={styles.rate}>{ratings}</span>
        </p>
        <p className={styles.votes}>Votes: {votes}</p>
        <h2 className={styles.price}>{price}</h2>
        <p className={styles.desc}>{desc}</p>
      </div>
      <div className={styles.addButton}>
        <button className={styles.add} onClick={alertHandler} disabled={dis}>
          Add +
        </button>
      </div>
    </div>
  );
};

export default Menu;
