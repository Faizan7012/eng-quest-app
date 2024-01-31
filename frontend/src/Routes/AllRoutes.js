import { Route, Routes } from "react-router-dom";
import Books from "../pages/Books";
import Login from "../pages/login";
import Signup from "../pages/signup";
import PrivateRoute from "../pages/privateRoute";

function AllRoutes(){
    return <Routes>
        <Route path='/' element={<PrivateRoute><Books /></PrivateRoute>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
    </Routes>
}


export default AllRoutes;