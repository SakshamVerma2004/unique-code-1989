import React, { useState, useEffect } from 'react';
import styles from "./Clock.module.css";
const Clock = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div><p className={styles.time}>{currentTime}</p></div>;
};

export default Clock;
