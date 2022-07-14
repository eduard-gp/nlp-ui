import { Outlet } from "react-router-dom";

import { NavBar } from "../../components";
import "./DashboardPage.css";

function DashboardPage() {
    return (
        <main>
            <NavBar></NavBar>
            <section className="dashboard-main-container">
                <Outlet />
            </section>
        </main>
    )
}

export default DashboardPage;