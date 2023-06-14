import { Link } from "react-router-dom";
import Login from "./Login";
import styles from "./SignUp.module.css";
let SignUp = ({onClick}) => {
  return (
    <div className={styles.main}>
      <div className={styles.cross}>
      <h1 className={styles.heading}>Sign up</h1>
      <p className={styles.cancel} onClick={onClick}>⨯</p>
      </div>
      <form>
        <div>
          <input type="text" placeholder="Full Name" className={styles.name} />
        </div>
        <div>
          <input type="email" placeholder="Email" className={styles.email} />
        </div>
        <div className={styles.change}>
          <input className={styles.check} type="checkbox" />
          <p className={styles.para}>
            I agree to QuickBite's Terms of Service , Privacy Policy and Content
            Policies
          </p>
        </div>
        <button className={styles.btn} type="submit">
          Create account
        </button>
      </form>
      <hr></hr>
      <h3>
        Already have an account ? <Link className={styles.link} to="/login">Log in</Link>
      </h3>
    </div>
  );
};
export default SignUp;
