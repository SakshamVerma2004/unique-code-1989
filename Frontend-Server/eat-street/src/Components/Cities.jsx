import { useState, useEffect } from "react";
import styles from "./Cities.module.css";
import { Link } from "react-router-dom";
let Cities = () => {
  let [cities, setCities] = useState([]);
  let [newCities, setNewCities] = useState([]);
  let [effectCount, setEffectCount] = useState(0);
  let fetchdata = () => {
    fetch("https://backend-server-unique-code-default-rtdb.firebaseio.com/restaurants.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCities(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let answer = () => {
    let answerCity = [];
    for (let i = 0; i < cities.length; i = i + 5) {
      answerCity.push(cities[i].city);
    }
    setNewCities(answerCity);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    answer();
  }, [cities]);
  return (
    <div className={styles.main}>
      {newCities.map((item) => (
        <div key={item} className={styles.city}>
          <Link to={`/${item}`} key={item}>
            {`${item} Restaurants`}
          </Link>
          <p className={styles.arrow}>{">"}</p>
        </div>
      ))}
    </div>
  );
};
export default Cities;