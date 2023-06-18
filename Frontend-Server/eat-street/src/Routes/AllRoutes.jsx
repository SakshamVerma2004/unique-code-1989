import { Route,Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import IndiviualCity from "../Pages/IndiviualCitiy";
import IndiviualRestaurant from "../Pages/IndiviualRestaurant";
import Cart from "../Pages/Cart";
import Checkout from "../Components/Checkout";
import Admin from "../Pages/Admin";
let AllRoutes=()=>{
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/:location" element={<IndiviualCity/>}></Route>
                <Route path="/:location/:restaurantName" element={<IndiviualRestaurant/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="/admin" element={<Admin/>}></Route>
            </Routes>
        </div>
    )
}
export default AllRoutes;