import { useContext, useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { AuthContext } from "../Context/AuthContextProvider";
import swal from "sweetalert";

const Checkout = () => {
  const { total } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    let formattedValue = value.replace(/\s/g, ""); // Remove all whitespace

    if (value.length > 0) {
      formattedValue = formattedValue.match(/.{1,4}/g).join(" ");
    }

    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    let formattedValue = value.replace(/\//g, ""); // Remove all forward slashes

    if (value.length > 0) {
      formattedValue = formattedValue.match(/.{1,2}/g).join("/");
    }

    setExpiryDate(formattedValue);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const submit = () => {
    if (name.trim().length < 3) {
      swal("Incorrect Name", "Name length cannot be lesser than 3", "error");
      return;
    }
    if (!email.includes("@") || email.length < 6) {
      swal("Incorrect email", "Please fill in a correct email", "error");
      return;
    }
    if (address.trim().length < 10) {
      swal(
        "Incorrect Address",
        "Please fill in a correct address with a minimum length of 10",
        "error"
      );
      return;
    }
    if (cardNumber.trim().length < 14) {
      swal("Incorrect Card Number", "Please fill in a correct card number with length of 12", "error");
      return;
    }
    if (expiryDate.trim().length < 5) {
      swal(
        "Incorrect Expiry Date",
        "Please fill in the expiry date according to the given format",
        "error"
      );
      return;
    }
    if (cvv.trim().length < 3) {
      swal("Incorrect CVV Number", "Please fill in a correct CVV number with length of 3", "error");
      return;
    }
    if (
      name.trim().length !== 0 &&
      email.trim().length !== 0 &&
      address.trim().length !== 0 &&
      cardNumber.trim().length !== 0 &&
      expiryDate.trim().length !== 0 &&
      cvv.trim().length !== 0
    ) {
      swal("Order Sent", "Your order has been submitted. Enjoy your meal!", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      fetch("https://backend-server-unique-code-default-rtdb.firebaseio.com/user-orders.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          cardNumber,
          expiryDate,
          cvv,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      swal("Failed", "Please fill in all the details", "error");
    }
  };

  useEffect(() => {
    setIsDisplayed(true);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.checkoutContainer} ${isDisplayed ? styles.showContainer : ""}`}>
        <h1 className={styles.checkoutHeading}>
          <span className={styles.totalAmount}>Total Amount: ₹ {total}</span>
        </h1>
        <div className={styles.checkoutFormContainer}>
          <form className={styles.checkoutForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                value={name}
                onChange={handleNameChange}
                placeholder="Full Name"
                minLength={3}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={handleEmailChange}
                placeholder="example@gmail.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>
                Address
              </label>
              <input
                type="text"
                id="address"
                className={styles.input}
                value={address}
                onChange={handleAddressChange}
                placeholder="House No.123, ABC Street, Near ABC, City"
                minLength={10}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cardNumber" className={styles.label}>
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className={styles.input}
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9123 4567"
                maxLength={19}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="expiryDate" className={styles.label}>
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                className={styles.input}
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cvv" className={styles.label}>
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className={styles.input}
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                maxLength={3}
              />
            </div>
            <button onClick={submit} type="submit" className={styles.submitButton}>
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
