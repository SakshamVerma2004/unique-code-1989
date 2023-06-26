 import { useParams, Navigate } from "react-router-dom";
import styles from "./IndiviualRestaurant.module.css";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Menu from "../Components/Menu";

let IndiviualRestaurant = () => {
  let [data, setData] = useState({});
  let [redirect, setRedirect] = useState(false);
  let [count, setCount] = useState(10);
  let { isLogin,time,setTime,loginName,loginEmail } = useContext(AuthContext);
  let { restaurantName, location } = useParams();
  let [searchInput, setSearchInput] = useState("");
  let [menu, setMenu] = useState([]);
  let [showOnlyVeg, setShowOnlyVeg] = useState(false);
  setTime(data.time);
  let handleVeg = () => {
    setShowOnlyVeg(!showOnlyVeg);
  };

  let handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  let cartLink=<Link to="/cart">Cart</Link>

  let content = (
    <div>
      <Navbar city={location} handleSearch={handleSearch} cart={cartLink}/>
      <hr className={styles.hr1} />
      <div className={styles.imageDiv}>
        <img className={styles.image} src={data.image} alt="main-image" />
      </div>
      <div className={styles.nameDiv}>
        <h1 className={styles.name}>{data.name}</h1>
        <div className={styles.reviewsDiv}>
          <div className={styles.ratings}>
            <img
              className={styles.ratingsStar}
              src="https://i.pinimg.com/originals/dc/67/6d/dc676d46e43fe72b853135688c1724ab.jpg"
              alt="ratings-star"
            />
            <h5 className={styles.ratingsText}>{data.ratings}</h5>
          </div>
          <div className={styles.reviewsDiv}>
            <button className={styles.reviewText}>
              Reviews :- {data["review-count"]}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.specialityDiv}>
        <h3 className={styles.speciality}>{data.speciality}</h3>
        <h3 className={styles.para}>
          Average <span className={styles.averagePrice}>{data.price}</span> Per
          Person
        </h3>
      </div>
      <div className={styles.addressDiv}>
        <h3 className={styles.address}>{data.address}</h3>
        <h3 className={styles.deliver}>
          Average Time Taken to Deliver{" "}
          <span className={styles.averageTime}>{data.time}</span>
        </h3>
      </div>
      <div className={styles.openDiv}>
        <h4 className={styles.openText}>Open-Now :</h4>
        <span className={styles.open}>{data.open} ( Today )</span>
      </div>
      <hr className={styles.hr2}></hr>
      <div className={styles.searchDiv}>
        <h1 className={styles.order}>Order Online</h1>
        <input
          type="text"
          placeholder="Search within the Menu"
          className={styles.search}
          value={searchInput}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.filter}>
        <h4 className={styles.apply}>Apply Filter : -</h4>
        <button className={styles.veg} onClick={handleVeg}>
          Veg Only
        </button>
      </div>
      <div className={styles.main}>
        <h1 className={styles.heading}>Restaurant Menu</h1>
        {menu
          .filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
          )
          .filter((item) => !showOnlyVeg || item.veg === "yes")
          .map((item) => {
            return <Menu key={item.id} {...item} />;
          })}
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
    fetch(
      `https://backend-server-unique-code-default-rtdb.firebaseio.com/restaurants.json`
    )
      .then((res) => res.json())
      .then((data) => {
        let filteredData = Object.values(data).filter(
          (item) => item.name === restaurantName && item.city === location
        );
        if (filteredData.length > 0) {
          setData(filteredData[0]);
          setMenu(filteredData[0].menu);
        } else {
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location, restaurantName]);

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
          <h2 className={styles.para}>
            You need to login first for accessing this page.
          </h2>
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

export default IndiviualRestaurant;
