import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Cart.module.css";
import { AuthContext } from "../Context/AuthContextProvider";

let Cart = () => {
  let [data, setData] = useState([]);
  let [qty, setQty] = useState({});
  let [filteredData, setFilteredData] = useState([]);
  let { loginName, loginEmail } = useContext(AuthContext);

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

  const updateQuantity = (itemId, newQty) => {
    if (newQty < 1) {
      deleteItem(itemId);
    } else {
      setQty((prevQty) => ({
        ...prevQty,
        [itemId]: newQty,
      }));
    }
  };

  const deleteItem = (itemId) => {
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
          const updatedQty = { ...prevQty };
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

  const getTotalPrice = () => {
    let totalPrice = 0;
    if (Array.isArray(data) && data.length > 0) {
      totalPrice = data.reduce(
        (acc, item) => acc + (qty[item.id] || 1) * item.totalPrice,
        0
      );
    }
    return totalPrice.toFixed(2);
  };

  const handleSearch = (searchInput) => {
    if (searchInput.trim() === "") {
      setFilteredData(data);
    } else {
      const filteredItems = data.filter((item) =>
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
                  <img src={item.image} className={styles.image} />
                  <div className={styles.values}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.price}>Price: {item.price}</p>
                    <h3 className={styles.desc}>{item.desc}</h3>
                  </div>
                </div>
                <div className={styles.options}>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        qty[item.id] ? qty[item.id] - 1 : 1
                      )
                    }
                  >
                    -
                  </button>
                  <p className={styles.qty}>Quantity: {qty[item.id]}</p>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        qty[item.id] ? qty[item.id] + 1 : 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>
      <div className={styles.btn}>
        <button className={styles.check}>Procceed To Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
