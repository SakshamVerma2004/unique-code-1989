import { useParams } from "react-router-dom";
import styles from "./IndiviualRestaurant.module.css";
import Navbar from "../Navbar/Navbar";
let IndiviualRestaurant=()=>{
    let {restaurantName,location}=useParams();
    return (
        <div>
            <div>
                <Navbar city={location}/>
                <hr className={styles.hr1}></hr>
            </div>
        </div>
    )
}
export default IndiviualRestaurant;