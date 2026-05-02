import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/product";
import { getProductById } from "../utils/api";
import { useCart } from "../context/CartContext";

function ProductDetail(){
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();
    const { addToCart} = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            if(!id) return;

            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error(`Error fetching Product: ${error}`);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuyNow = () => {
        if(!product) return; // safety check

        addToCart(product);  // add product
        navigate("/checkout"); // go to checkout
    };

    const handleAddToCart = () => {
        if(!product) return;
        addToCart(product);
    };

    if(!product) return <p className="text-center">Loading...</p>

    return(
        <div className="max-w-6xl mx-auto px-8 py-8 grid md:grid-cols-2 gap-10">           

            {/* Image */}
            <div className="bg-white rounded-2xl shadow p-4">
                <img src={product.thumbnail} alt={product.title} className="w-full rounded-xl object-cover" />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

                {/* Rating */}
                <p className="text-yellow-500 font-medium">⭐{product.rating}</p>

                {/* Price */}
                <p className="text-2xl font-bold text-indigo-600">${product.price}</p>

                {/* Description */}
                <div>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                <div className="flex gap-4 mt-4">

                    {/* Add to Cart */}
                    <button onClick={handleAddToCart} className="flex-1 mt-4 bg-white-600 text-black py-3 rounded-lg border border-[#D6D6D6] hover:bg-indigo-700 hover:text-white transition cursor-pointer">Add to Cart</button>

                    {/* Buy Now */}
                    <button onClick={handleBuyNow} className="flex-1 mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer">Buy Now</button>

                </div>

            </div>



        </div>
    );
}

export default ProductDetail;