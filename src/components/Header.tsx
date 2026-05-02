import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header(){
    const { cart } = useCart();

    const totalItems = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    return(
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-indigo-600">ShopSphere</Link>

                {/* Nav */}
                <nav className="flex items-center gap-6 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-indigo-600">Home</Link>
                    <Link to="/shop" className="hover:text-indigo-600">Shop</Link>                    
                    <Link  to="/cart" className="relative">🛒
                        {totalItems > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{totalItems}</span>}                    
                    </Link>
                </nav>

            </div>
        </header>
    );
}

export default Header;