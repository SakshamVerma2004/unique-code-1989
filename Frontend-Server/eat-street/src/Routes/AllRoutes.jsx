import { Route,Routes } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import HomePage from "../Pages/HomePage";
let AllRoutes=()=>{
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
            </Routes>
        </div>
    )
}
export default AllRoutes;