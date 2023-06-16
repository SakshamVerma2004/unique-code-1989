import { Link, useParams } from "react-router-dom";
import styles from "./Card.module.css";
import { useEffect, useState } from "react";
let Card = ({
  address,
  city,
  image,
  name,
  open,
  price,
  ratings,
  speciality,
  time,
  menu,
  "pure-veg": pureVeg,
  "review-count": reviewCount
}) => {
  let {location}=useParams();
  let [resName,setResName]=useState("");
  useEffect(()=>{
    setResName(name);
  },[resName]);
  return (
    <div className={styles.main}>
      <img src={image} alt="restaurant-image" className={styles.image} />
      <div className={styles.nameDiv}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.ratingsDiv}>
          <p className={styles.ratingsCount}>{ratings}</p>
          <img
            className={styles.ratingsStar}
            src="https://i.pinimg.com/originals/dc/67/6d/dc676d46e43fe72b853135688c1724ab.jpg"
            alt="ratings-star"
          />
        </div>
      </div>
      <div className={styles.specialityDiv}>
        <h3>{speciality}</h3>
        <h3>{`${price} for one`}</h3>
      </div>
      <div className={styles.viewDetailsDiv}>
      <h3 className={styles.totalReviews}>{`Total ${reviewCount} people have given their ratings to this restaurant`}</h3>
      <Link to={`/${location}/${name}`} className={styles.link}>View Details{">"}</Link>
      </div>
    </div>
  );
};
export default Card;