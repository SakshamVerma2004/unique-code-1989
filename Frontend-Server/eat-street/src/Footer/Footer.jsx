import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
let Footer = () => {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>QuickBite</h2>
      <div className={styles.parent}>
        <div>
          <h4>ABOUT QUICKBITE</h4>
          <div className={styles.child}>
            <div>
              <Link>Who Are We</Link>
            </div>
            <div>
              <Link>Blog</Link>
            </div>
            <div>
              <Link>Work With Us</Link>
            </div>
            <div>
              <Link>Investor Relations</Link>
            </div>
            <div>
              <Link>Report Fraud</Link>
            </div>

            <div>
              <Link>Contact Us</Link>
            </div>
          </div>
        </div>
        <div>
          <h4>QUICKVERSE</h4>
          <div className={styles.child}>
            <div>
              <Link>QuickBite</Link>
            </div>
            <div>
              <Link>Blinkit</Link>
            </div>
            <div>
              <Link>Feeding India</Link>
            </div>
            <div>
              <Link>Investor Relations</Link>
            </div>
            <div>
              <Link>Hyperpure</Link>
            </div>
            <div>
              <Link>Quickland</Link>
            </div>
          </div>
        </div>
        <div>
          <h4>FOR RESTAURANTS</h4>
          <div className={styles.child}>
            <div>
              <Link>Partner With Us</Link>
            </div>
            <div>
              <Link>Blog</Link>
            </div>
            <div>
              <Link>Apps For You</Link>
            </div>
          </div>
        </div>
        <div>
          <h4>FOR ENTERPRISES</h4>
          <div className={styles.child}>
            <div>
              <Link>QuickBite For Enterprise</Link>
            </div>
          </div>
        </div>
        <div>
          <h4>LEARN MORE</h4>
          <div className={styles.child}>
            <div>
              <Link>Privacy</Link>
            </div>
            <div>
              <Link>Security</Link>
            </div>
            <div>
              <Link>Terms</Link>
            </div>
            <div>
              <Link>Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.para}>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2023 © QuickBite™ Ltd. All rights reserved.</p>
    </div>
  );
};
export default Footer;
