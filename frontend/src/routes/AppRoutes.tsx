
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/erp/Login";
import PrivateRoutes from "./PrivateRoutes";

import Dashboard from "../pages/erp/Dashboard";
import Layout from "../components/erp/Layout";
import Products from "../pages/erp/Products";
import Categories from "../pages/erp/Categories";
import Stock from "../pages/erp/Stocks";
import Users from "../pages/erp/Users";
import Orders from "../pages/erp/Orders";
import EcommerceLayout from "../components/ecommerce/Layout";
import Produtos from "../pages/ecommerce/Products"
import Carrinho from "../pages/ecommerce/Cart";
import Home from "../pages/ecommerce/Home";
import Profile from "../pages/ecommerce/Profile";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login do ERP */}
                <Route path="/login" element={<Login />} />

                {/* Loja virtual */}
                <Route element={<EcommerceLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/produtos" element={<Produtos/>}/>
                    <Route path="/carrinho" element={<Carrinho/>}/>
                </Route>

                {/* Área administrativa */}
                <Route
                    path="/erp"
                    element={
                        <PrivateRoutes
                            allowedRoles={["ADMIN", "MANAGER"]}
                        />
                    }
                >
                    <Route element={<Layout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="products" element={<Products />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="stock" element={<Stock />} />
                        <Route path="users" element={<Users />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}