import { Route,Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import IndiviualCity from "../Pages/IndiviualCitiy";
import IndiviualRestaurant from "../Pages/IndiviualRestaurant";
import Cart from "../Pages/Cart";
let AllRoutes=()=>{
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/:location" element={<IndiviualCity/>}></Route>
                <Route path="/:location/:restaurantName" element={<IndiviualRestaurant/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
            </Routes>
        </div>
    )
}
export default AllRoutes;