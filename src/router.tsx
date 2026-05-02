import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true, element: <Home />
            },
            {
                path: "shop", element: <Shop />
            },
            {
                path: "product/:id", element: <ProductDetail />
            },
            {
                path: "cart", element: <Cart />
            },
            {
                path: "checkout", element: <Checkout />
            },
            {
                path: "success", element: <OrderSuccess />
            }
            
        ]
    }
]);


export default router;