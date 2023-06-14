import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Cities from "../Components/Cities";
import Footer from "../Footer/Footer";
import SignUp from "./SignUp";
import Backdrop from "../Components/Backdrop";
import Login from "./Login";
import { useState } from "react";
import { useEffect } from "react";
let HomePage = () => {
  let [blur, setBlur] = useState(false);
  let [bright,setBright]=useState(false);
  let blurHandler = () => {
    setBlur(true);
  };
  let brightnessHandler=()=>{
    setBright(true);
  }
  let resetBlurHandler = () => {
    setBlur(false);
  };
  let links = (
    <div className={styles.navbar}>
      <Link onClick={brightnessHandler}>Log in</Link>
      <Link onClick={blurHandler}>Sign up</Link>
    </div>
  );
  let text = (
    <div className={styles.inside}>
      <h1 className={styles.quick}>QuickBite</h1>
      <h2 className={styles.satisfy}>
        Satisfy your cravings with our swift and scrumptious food experience.
      </h2>
    </div>
  );
  useEffect(() => {
    if (blur) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [blur]);
  return (
    <div>
      <div className={blur ? styles.blurredImage : styles.main}>
        <div>{!blur ? links : ""}</div>
        {!blur ? text : ""}
        <div className={styles.noblur}>
          {blur ? <SignUp onClick={resetBlurHandler} /> : ""}
          {bright ? <Login onClick={brightnessHandler}/>:""}
        </div>
      </div>
      <div className={styles.popularheadingdiv}>
        <h1 className={styles.popularheading}>
          Popular locations in{" "}
          <img
            className={styles.flag}
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
            alt="Indian-flag"
          />{" "}
          <span className={styles.change}>India</span>
        </h1>
      </div>
      <div className={styles.description}>
        <p>
          From swanky upscale restaurants to the cosiest hidden gems serving the
          most incredible food, QuickBite covers it all. Explore menus, and
          millions of restaurant photos and reviews from users just like you, to
          find your next great meal.
        </p>
      </div>
      <Cities />
      <Footer />
    </div>
  );
};
export default HomePage;
