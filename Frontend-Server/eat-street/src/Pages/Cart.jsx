import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Cart.module.css";
import { AuthContext } from "../Context/AuthContextProvider";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import MenuItems from "../Components/MenuItems";
import Footer from "../Footer/Footer";

let Cart = () => {
  let [data, setData] = useState([]);
  let [qty, setQty] = useState({});
  let [filteredData, setFilteredData] = useState([]);
  let { loginName, loginEmail, setTotal, btndis, setBtnDis, filterlength, setFilterlength, removed, setRemoved,showCartItems,setShowCartItems } =
    useContext(AuthContext);

  let fetchData = () => {
    fetch(
      "https://backend-server-unique-code-default-rtdb.firebaseio.com/extra.json"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          let dataArray = Object.values(data);
          let filteredData = dataArray.filter(
            (item) =>
              item.loginName === loginName && item.loginEmail === loginEmail
          );
          setData(filteredData);
          setFilteredData(filteredData.slice(-1));
          let initialQty = filteredData.reduce(
            (acc, item) => ({
              ...acc,
              [item.id]: 1,
            }),
            {}
          );
          setQty(initialQty);
          setFilterlength(filteredData.length === 1);
          setBtnDis(filterlength);
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
      `https://backend-server-unique-code-default-rtdb.firebaseio.com/extra/${itemId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          setData((prevData) => prevData.filter((item) => item.id !== itemId));
          setFilteredData((prevFilteredData) =>
            prevFilteredData.filter((item) => item.id !== itemId)
          );
          setQty((prevQty) => {
            let updatedQty = { ...prevQty };
            delete updatedQty[itemId];
            return updatedQty;
          });
          console.log("Item deleted successfully");
        } else {
          throw new Error("Failed to delete item");
        }
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

      setFilteredData(updatedData.slice(-1));
    }
  }, [data, qty]);

  let getTotalPrice = () => {
    if (!showCartItems) {
      setTotal("0.00");
      return "0.00";
    }

    let totalPrice = 0;
    if (Array.isArray(filteredData) && filteredData.length > 0) {
      totalPrice = filteredData.reduce((acc, item) => acc + item.totalPrice, 0);
    }
    setTotal(totalPrice.toFixed(2));
    return totalPrice.toFixed(2);
  };

  let handleSearch = (searchInput) => {
    if (searchInput.trim() === "") {
      setFilteredData(data.slice(-1));
    } else {
      let filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredData(filteredItems.slice(-1));
    }
  };

  return (
    <div>
      <Navbar
        handleSearch={handleSearch}
        cart={
          !showCartItems ? (
            <p className={styles.items}>0 Item(s)</p>
          ) : (
            <p className={styles.items}>{filteredData.length} Item(s)</p>
          )
        }
      />
      <div className={styles.main}>
        <div className={styles.totalDiv}>
          <h1 className={styles.heading2}>Cart Items</h1>
          <h2 className={styles.total}>Total Amount: ₹ {getTotalPrice()}</h2>
        </div>
        <div className={styles.cartItems}>
          {!showCartItems ? (
            <p className={styles.check}></p>
          ) : Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((item) => (
              <MenuItems
                item={item}
                key={item.id}
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
                qty={qty[item.id]}
              />
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
      {showCartItems?
      (
        <div className={styles.btn}>
        {filteredData.length > 0 && !removed ? (
          <div className="footerDiv">
            <Link to="/checkout" className={styles.check}>
              Proceed To Checkout
            </Link>
          </div>
        ) : (
          <p className={styles.check}></p>
        )}
      </div>
      )
      :<p className={styles.cartEmpty}>Your Cart is Empty</p>}
      <Footer/>
    </div>
  );
};

export default Cart;
