import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Cities from "../Components/Cities";
import Footer from "../Footer/Footer";
import SignUp from "./SignUp";
import Login from "./Login";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Profile from "./Profile";
import { AuthContext } from "../Context/AuthContextProvider";
let HomePage = () => {
  let [displayProfile,setDisplayProfile]=useState(false);
  let [drop, setDrop] = useState(false);
  let {
    setSignupShow,
    setLoginShow,
    setLinksShow,
    signupShow,
    loginShow,
    linksShow,
    isLogin,
    setIsLogin,
    loginName,
    setLoginName,
    logout
  } = useContext(AuthContext);
  let [show, setShow] = useState(true);
  let blurHandler = () => {
    setSignupShow(true);
    setLoginShow(false);
    setLinksShow(false);
    setShow(false);
  };
  let brightnessHandler = () => {
    setSignupShow(false);
    setLoginShow(true);
    setLinksShow(false);
    setShow(false);
  };
  let resetBlurHandler = () => {
    setSignupShow(false);
    setShow(true);
  };
  let resetBrightnessHandler = () => {
    setLoginShow(false);
    setLinksShow(true);
    setShow(true);
  };
  let showDropdown = () => {
    setDrop(!drop);
  };
  let showProfile=()=>{
    setDisplayProfile(!displayProfile);
  }
  let dropdown = (
    <div className={styles.dropdown}>
      <div className={styles.high}></div>
      <Link className={styles.pro} onClick={showProfile}>Profile</Link>
      {displayProfile?<Profile/>:null};
      <div>
        <div className={styles.high}></div>
        <Link className={styles.logout} onClick={logout}>Logout</Link>
      </div>
    </div>
  );
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
  let profile = (
    <div className={styles.profileItems}>
      <Link className={styles.profile} onClick={showDropdown}>
        {loginName}
      </Link>
      {drop?<div>{dropdown}</div>:null}
    </div>
  );
  useEffect(() => {
    if (signupShow === true) {
      setShow(false);
    }
    if (loginShow === true) {
      setShow(false);
    }
    if (signupShow === false) {
      setShow(true);
    }
    if (loginShow === false) {
      setShow(true);
    }
  }, [show]);
  useEffect(() => {
    if (signupShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [signupShow]);
  useEffect(() => {
    if (loginShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loginShow]);
  return (
    <div>
      <div className={signupShow ? styles.blurredImage : styles.main}>
        {!isLogin ? <div>{linksShow ? links : ""}</div> : profile}
        <div className={styles.noblur}>
          {signupShow ? <SignUp /> : ""}
          {loginShow ? <Login /> : ""}
        </div>
        {show ? text : ""}
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
