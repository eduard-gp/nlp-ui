import { Outlet } from "react-router-dom";
import { NavBar } from "../../components";

function DashboardPage() {
    return (
        <main>
            <NavBar></NavBar>
            <section>
                <Outlet />
            </section>
        </main>
    )
}

export default DashboardPage;