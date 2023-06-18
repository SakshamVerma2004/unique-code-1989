import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Cart.module.css";
import { AuthContext } from "../Context/AuthContextProvider";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

let Cart = () => {
  let [data, setData] = useState([]);
  let [qty, setQty] = useState({});
  let [filteredData, setFilteredData] = useState([]);
  let { loginName, loginEmail, setTotal } = useContext(AuthContext);
  
  let fetchData = () => {
    fetch("https://backend-server-8879b-default-rtdb.firebaseio.com/extra.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          let dataArray = Object.values(data);
          let filteredData = dataArray.filter(
            (item) =>
              item.loginName === loginName && item.loginEmail === loginEmail
          );
          setData(filteredData);
          setFilteredData(filteredData);
          let initialQty = filteredData.reduce(
            (acc, item) => ({
              ...acc,
              [item.id]: 1,
            }),
            {}
          );
          setQty(initialQty);
        } else {
          setData([]);
          setFilteredData([]);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let updateQuantity = (itemId, newQty) => {
    if (newQty < 1) {
      deleteItem(itemId);
    } else {
      setQty((prevQty) => ({
        ...prevQty,
        [itemId]: newQty,
      }));
    }
  };

  let deleteItem = (itemId) => {
    fetch(
      `https://backend-server-8879b-default-rtdb.firebaseio.com/extra/${itemId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("Item deleted successfully");
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((item) => item.id !== itemId)
        );
        setQty((prevQty) => {
          let updatedQty = { ...prevQty };
          delete updatedQty[itemId];
          return updatedQty;
        });
      })
      .catch((error) => {
        console.log("Error deleting item:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [loginName, loginEmail]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      let updatedData = data.map((item) => {
        let price = parseFloat(item.price.split("₹ ")[1]);
        let itemQty = qty[item.id] || 1;
        let totalPrice = price * itemQty;
        return {
          ...item,
          totalPrice,
        };
      });

      setData(updatedData);
      setFilteredData(updatedData);
    }
  }, [qty]);

  let getTotalPrice = () => {
    let totalPrice = 0;
    if (Array.isArray(data) && data.length > 0) {
      totalPrice = data.reduce(
        (acc, item) => acc + (qty[item.id] || 1) * item.totalPrice,
        0
      );
    }
    setTotal(totalPrice.toFixed(2));
    return totalPrice.toFixed(2);
  };

  let handleSearch = (searchInput) => {
    if (searchInput.trim() === "") {
      setFilteredData(data);
    } else {
      let filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  };

  return (
    <div>
      <Navbar handleSearch={handleSearch} cart={filteredData.length} />
      <div className={styles.main}>
        <div className={styles.totalDiv}>
          <h1 className={styles.heading2}>Cart Items</h1>
          <h2 className={styles.total}>Total Amount: ₹ {getTotalPrice()}</h2>
        </div>
        <div className={styles.cartItems}>
          {Array.isArray(filteredData) ? (
            filteredData.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.mainDiv}>
                  <img src={item.image} className={styles.image} alt={item.name} />
                  <div className={styles.values}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.price}>Price: {item.price}</p>
                    <h3 className={styles.desc}>{item.desc}</h3>
                  </div>
                </div>
                <div className={styles.options}>
                  <Button
                    onClick={() => updateQuantity(item.id, qty[item.id] - 1)}
                    text="-"
                  />
                  <p className={styles.qty}>Quantity: {qty[item.id] || 1}</p>
                  <Button
                    onClick={() => updateQuantity(item.id, qty[item.id] + 1)}
                    text="+"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>
      <div className={styles.btn}>
        {filteredData.length > 0 ? (
          <Link to="/checkout" className={styles.check}>
            Proceed To Checkout
          </Link>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;