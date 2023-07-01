import React from "react";
import axios from "axios";
import styles from "./MenuItems.module.css";
import Button from "./Button";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

const MenuItems = ({ item, updateQuantity, deleteItem, qty }) => {
  let {
    removed,
    setRemoved,
    addedItem,
    setAddedItem,
    showCartItems,
    setShowCartItems
  } = useContext(AuthContext);
  const handleDecrease = () => {
    if (qty > 1) {
      updateQuantity(item.id, qty - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, qty + 1);
  };

  const itemQuantity = qty || 1;

  const handleDeleteItem = (loginEmail) => {
    setShowCartItems(false);
    setAddedItem(false);
    setRemoved(true);
    axios
      .delete(
        `https://backend-server-unique-code-default-rtdb.firebaseio.com/extra.json?orderBy="loginEmail"&equalTo="${loginEmail}"`
      )
      .then(() => {
        deleteItem(item.id);
      })
      .catch((error) => {
        console.log("Error deleting item:", error);
      });
  };

  return (
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
        <Button onClick={handleDecrease} text="-" disabled={itemQuantity === 1} />
        <p className={styles.qty}>Quantity: {itemQuantity}</p>
        <Button onClick={handleIncrease} text="+" />
      </div>
      <button
        className={styles.remove}
        onClick={() => handleDeleteItem(item.loginEmail)}
      >
        Remove
      </button>
    </div>
  );
};

export default MenuItems;
