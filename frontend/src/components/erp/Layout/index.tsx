import { Outlet } from "react-router-dom"
import './styles.css'
import SideBar from "../Sidebar"

export default function Layout(){
    return(
        <div className="container">
            <SideBar/>
            <main className="main">
                <div className="content">
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}