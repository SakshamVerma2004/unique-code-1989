import { useState } from "react";
import styles from "./Button.module.css";
let Button = ({ text, onClick }) => {
  return <button onClick={onClick} className={styles.btn}>{text}</button>;
};

export default Button;