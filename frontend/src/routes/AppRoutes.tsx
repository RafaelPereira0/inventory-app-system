import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layout";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Stock from "../pages/Stocks";
import Users from "../pages/Users";

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                        <Route path="/stock" element={<Stock/>}/>
                        <Route path="/users" element={<Users/>}/>
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}