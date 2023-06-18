import { useEffect, useState } from "react";
import Clock from "../Components/Clock";
import styles from "./Admin.module.css";
import {Link} from "react-router-dom";

const Admin = () => {
  const [res, setRes] = useState(0);
  const [resData, setResData] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [signUp, setSignUp] = useState(0);
  const [login, setLogin] = useState(0);
  const [cart, setCart] = useState([]);

  const showCartHandler = () => {
    setShowCart(!showCart);
  };

  const fetchRestaurantsData = () => {
    fetch(
      "https://backend-server-8879b-default-rtdb.firebaseio.com/restaurants.json"
    )
      .then((res) => res.json())
      .then((dataRes) => {
        setResData(dataRes);
        setRes(dataRes.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSignupData = () => {
    fetch(
      "https://backend-server-8879b-default-rtdb.firebaseio.com/signup.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setSignUp(Object.values(data).length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchLoginData = () => {
    fetch("https://backend-server-8879b-default-rtdb.firebaseio.com/users.json")
      .then((res) => res.json())
      .then((data) => {
        setLogin(Object.values(data).length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCart = () => {
    fetch("https://backend-server-8879b-default-rtdb.firebaseio.com/extra.json")
      .then((res) => res.json())
      .then((data) => {
        setCart(Object.values(data));
        console.log(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCart();
    fetchRestaurantsData();
    fetchSignupData();
    fetchLoginData();
  }, []);

  const showResHandler = () => {
    setShowRes(!showRes);
  };

  return (
    <div className={styles.main}>
      <div className={styles.imageDiv}>
        <img
          src="https://picfiles.alphacoders.com/265/thumb-1920-26551.jpg"
          alt="admin-image"
          className={styles.image}
        />
        <div className={styles.desc}>
          <h1 className={styles.hello}>Admin</h1>
          <Clock />
        </div>
        <div className={styles.userDiv}>
          <h3>Number of Logged in Users: {login}</h3>
          <h3>Number of Signed Up Users: {signUp}</h3>
          <Link className={styles.link} to="/">Move Back to Home</Link>
        </div>
      </div>
      <div className={styles.resDiv}>
        <h2>Number of Restaurants: {res}</h2>
        <p className={styles.show} onClick={showResHandler}>
          Show restaurants {"->"}
        </p>
      </div>
      {showRes && (
        <div className={styles.restaurants}>
          {resData.map((item) => (
            <div className={styles.gridDiv} key={item.id}>
              <img
                src={item.image}
                alt="restaurants-image"
                className={styles.resImage}
              />
              <div className={styles.itemDiv}>
                <h5 className={styles.name}>{item.name}</h5>
                <p className={styles.ratings}>Ratings: {item.ratings}</p>
              </div>
              <div className={styles.paraDiv}>
                <h4 className={styles.address}>Address: {item.address}</h4>
                <p className={styles.city}>City: {item.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2 className={styles.head2}>Items in Cart (All): {cart.length}</h2>
      <p className={styles.show} onClick={showCartHandler}>
        Show Cart Data {"->"}
      </p>
      {showCart && (
        <div className={styles.cartDiv}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div className={styles.cartMainDiv}>
                <img src={item.image} alt="cart-item" className={styles.cartImage}/>
                <div className={styles.detailDiv}>
                    <h2 className={styles.cartName}>{item.name}</h2>
                    <h3 className={styles.cartTime}>Delivery Time : {item.time}</h3>
                </div>
                <div className={styles.priceDiv}>
                    <h3 className={styles.cartPrice}>Price : {item.price}</h3>
                    <h4 className={styles.cartDesc}>{item.desc}</h4>
                </div>
                <div className={styles.loginDiv}>
                    <h3 className={styles.cartBy}>Purchased by :-</h3>
                    <p className={styles.cartLoginName}>Name : {item.loginName}</p>
                    <p className={styles.cartLoginEmail}>Email : {item.loginEmail}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Admin;