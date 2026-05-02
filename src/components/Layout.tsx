import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useCart } from "../context/CartContext";

function Layout(){
    const { message } = useCart();

    return(
        <div className="flex flex-col min-h-screen">
            <Header />

            {
                message && (
                    <div className="fixed top-20 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-all duration-300">
                        {message}
                    </div>
                )
            }

            <main className="grow w-full">
                <Outlet />
            </main>            

            <Footer />
        </div>
    );
}

export default Layout;