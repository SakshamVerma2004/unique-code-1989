import { Navigate, useParams } from "react-router-dom";
import styles from "./IndiviualCity.module.css";
import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../Context/AuthContextProvider";
import Footer from "../Footer/Footer";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

let IndiviualCity = () => {
  let [count, setCount] = useState(10);
  let { isLogin } = useContext(AuthContext);
  let { location } = useParams();
  let [data, setData] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [redirect, setRedirect] = useState(false);
  let [pureVegClicked, setPureVegClicked] = useState(false);
  let [sortLowToHigh, setSortLowToHigh] = useState(false);
  let [sortHighToLow, setSortHighToLow] = useState(false);
  let [filteredData, setFilteredData] = useState([]);
  let [filteredDataLength, setFilteredDataLength] = useState(0);

  let handleSearch = (value) => {
    setSearchInput(value);
  };

  let handleRatingFilter = () => {
    let filteredData = data.filter((item) => {
      let rating = parseFloat(item.rating);
      return rating >= 4.0 && (!pureVegClicked || item["pure-veg"] === "yes");
    });
    setFilteredData(filteredData);
    setFilteredDataLength(filteredData.length);
  };

  let handlePureVegFilter = () => {
    setPureVegClicked(!pureVegClicked);
  };

  let handleSortLowToHigh = () => {
    let sortedData = [...data].sort((a, b) => getPrice(a) - getPrice(b));
    setFilteredData(sortedData);
    setFilteredDataLength(sortedData.length);
    setSortLowToHigh(true);
    setSortHighToLow(false);
  };

  let handleSortHighToLow = () => {
    let sortedData = [...data].sort((a, b) => getPrice(b) - getPrice(a));
    setFilteredData(sortedData);
    setFilteredDataLength(sortedData.length);
    setSortLowToHigh(false);
    setSortHighToLow(true);
  };

  let getPrice = (item) => {
    let price = item.price.trim().split("₹")[1].trim();
    return parseInt(price);
  };

  let content = (
    <div>
      <Navbar city={location} handleSearch={handleSearch} />
      <div className={styles.options}>
        <button onClick={handleRatingFilter}>Rating: 4.0+</button>
        <button
          className={`${styles.veg} ${pureVegClicked ? styles.active : ""}`}
          onClick={handlePureVegFilter}
        >
          Pure Veg
        </button>
        <button onClick={handleSortLowToHigh}>Sort Low to High</button>
        <button onClick={handleSortHighToLow}>Sort High to Low</button>
      </div>
      <div className={styles.heading}>
        <h1 className={styles.weight}>
          Delivery Restaurants in <span className={styles.head}>{location}</span>
        </h1>
      </div>
      <div className={styles.area}>
        {filteredData
          .filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))
          .filter((item) => !pureVegClicked || item["pure-veg"] === "yes")
          .map((item) => (
            <Card key={item.id} {...item} />
          ))}
      </div>
      <Footer />
    </div>
  );

  useEffect(() => {
    if (!isLogin) {
      let timer = setTimeout(() => {
        if (count > 0) {
          setCount((prevCount) => prevCount - 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLogin, count]);

  useEffect(() => {
    if (count === 0) {
      setRedirect(true);
    }
  }, [count]);

  useEffect(() => {
    fetch(`https://backend-server-unique-code-default-rtdb.firebaseio.com/restaurants.json`)
      .then((res) => res.json())
      .then((data) => {
        let filteredData = Object.values(data).filter((item) => item.city === location);
        setData(filteredData);
        setFilteredData(filteredData);
        setFilteredDataLength(filteredData.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  if (!data) {
    return (
      <div className={styles.loading}>
        <img
          className={styles.gif}
          src="https://media.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.gif"
          alt="gif"
        />
      </div>
    );
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {isLogin ? (
        <div>{content}</div>
      ) : (
        <div className={styles.redirect}>
          <h1 className={styles.alert}>Login required</h1>
          <h2 className={styles.para}>You need to login first for accessing this page.</h2>
          <p>
            You are being redirected to the home page in <span className={styles.counter}>{count}</span> seconds.
          </p>
          <p>
            You can also go to the home page by clicking on this link:{" "}
            <Link to="/" className={styles.homepage}>
              Homepage
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default IndiviualCity;