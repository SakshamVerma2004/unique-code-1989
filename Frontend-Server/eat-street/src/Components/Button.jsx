import { useState } from "react";
import styles from "./Button.module.css";
let Button = ({ text, onClick,disabled }) => {
  return <button onClick={onClick} className={styles.btn} disabled={disabled}>{text}</button>;
};

export default Button;