import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer className="bg-gray-100 w-full">
            <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} <Link to="/">ShopSphere</Link> | All Rights Reserved</p>                
            </div>
        </footer>
    );
}

export default Footer;