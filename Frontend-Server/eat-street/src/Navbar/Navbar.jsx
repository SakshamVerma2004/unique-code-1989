import { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";

let Navbar = ({ city, handleSearch,cart }) => {
  let { loginName } = useContext(AuthContext);

  return (
    <div className={styles.main}>
      <Link to="/" className={styles.logo}>
        QuickBite
      </Link>
      <div className={styles.searchDiv}>
        <div className={styles.locationDiv}>
          <img
            className={styles.location}
            src="https://static.vecteezy.com/system/resources/previews/000/552/361/original/geo-location-pin-vector-icon.jpg"
            alt="location-mark-icon"
          />
          <h4>{city}</h4>
        </div>
        <div className={styles.content}>
          <img
            className={styles.searchIcon}
            src="https://www.288group.com/wp-content/uploads/2017/04/Grey-magnifying-glass.png"
            alt="search-icon"
          />
          <input
            type="text"
            placeholder="Search for restaurants"
            className={styles.search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.loginDiv}>
        <h4 className={styles.loginText}>Logged in as {"->"}</h4>
        <h4 className={styles.loginName}>{loginName}</h4>
      </div>
      <h4 className={styles.items}>{cart} Items</h4>
    </div>
  );
};

export default Navbar;