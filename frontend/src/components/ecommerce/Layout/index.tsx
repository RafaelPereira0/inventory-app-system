
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import './styles.css'

export default function EcommerceLayout() {
    return (
        <div className="ecommerce-layout">
            <Header />

            <main className="ecommerce-main">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}