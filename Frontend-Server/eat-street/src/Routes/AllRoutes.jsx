import { Route,Routes } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import HomePage from "../Pages/HomePage";
import IndiviualCity from "../Pages/IndiviualCitiy";
import IndiviualRestaurant from "../Pages/IndiviualRestaurant";
let AllRoutes=()=>{
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/:location" element={<IndiviualCity/>}></Route>
                <Route path="/:location/:restaurantName" element={<IndiviualRestaurant/>}></Route>
            </Routes>
        </div>
    )
}
export default AllRoutes;