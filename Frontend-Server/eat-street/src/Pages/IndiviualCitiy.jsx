import { Navigate, useParams } from "react-router-dom";
import styles from "./IndiviualCity.module.css";
import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../Context/AuthContextProvider";
import Footer from "../Footer/Footer";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

const IndividualCity = () => {
  const [count, setCount] = useState(10);
  const { isLogin } = useContext(AuthContext);
  const { location } = useParams();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [pureVegClicked, setPureVegClicked] = useState(false);
  const [sortLowToHigh, setSortLowToHigh] = useState(false);
  const [sortHighToLow, setSortHighToLow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLength, setFilteredDataLength] = useState(0);
  const [filterActive, setFilterActive] = useState(false);

  const handleSearch = (value) => {
    setSearchInput(value);
  };

  const handleRatingFilter = () => {
    if (filterActive) {
      setFilteredData(data);
      setFilteredDataLength(data.length);
      setFilterActive(false);
    } else {
      const filteredData = data.filter(
        (item) =>
          parseFloat(item.ratings) >= 4.0 && (!pureVegClicked || item["pure-veg"] === "yes")
      );
      setFilteredData(filteredData);
      setFilteredDataLength(filteredData.length);
      setFilterActive(true);
    }
  };

  const handlePureVegFilter = () => {
    setPureVegClicked(!pureVegClicked);
  };

  const handleSortLowToHigh = () => {
    if (sortLowToHigh) {
      setFilteredData(data);
      setSortLowToHigh(false);
    } else {
      const sortedData = [...data].sort((a, b) => getPrice(a) - getPrice(b));
      setFilteredData(sortedData);
      setFilteredDataLength(sortedData.length);
      setSortLowToHigh(true);
      setSortHighToLow(false);
    }
  };

  const handleSortHighToLow = () => {
    if (sortHighToLow) {
      setFilteredData(data);
      setSortHighToLow(false);
    } else {
      const sortedData = [...data].sort((a, b) => getPrice(b) - getPrice(a));
      setFilteredData(sortedData);
      setFilteredDataLength(sortedData.length);
      setSortLowToHigh(false);
      setSortHighToLow(true);
    }
  };

  const getPrice = (item) => {
    const price = item.price.trim().split("₹")[1].trim();
    return parseInt(price);
  };

  const content = (
    <div>
      <Navbar city={location} handleSearch={handleSearch} />
      <div className={styles.options}>
        <button onClick={handleRatingFilter}>
          {filterActive ? "Rating: 4.0+" : "Rating: 4.0+"}
        </button>
        <button
          className={`${styles.veg} ${pureVegClicked ? styles.active : ""}`}
          onClick={handlePureVegFilter}
        >
          Pure Veg
        </button>
        <button
          className={`${styles.sort} ${sortLowToHigh ? styles.active : ""}`}
          onClick={handleSortLowToHigh}
        >
          Sort Low to High
        </button>
        <button
          className={`${styles.sort} ${sortHighToLow ? styles.active : ""}`}
          onClick={handleSortHighToLow}
        >
          Sort High to Low
        </button>
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
      const timer = setTimeout(() => {
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
        const filteredData = Object.values(data).filter((item) => item.city === location);
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
            You are being redirected to the home page in{" "}
            <span className={styles.counter}>{count}</span> seconds.
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

export default IndividualCity;
